import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchCars, fetchCarById } from "./operations";

const initialState = {
  list: [],
  total: 0,
  page: 1,
  totalPages: 1,
  limit: "12",
  filters: {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  },
  brands: [],
  current: null,
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
   
    resetList(state) {
      state.list = [];
      state.total = 0;
      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
    
    applyFilters(state, action) {
        const payload = action.payload || {};
      state.filters = {
        brand: payload?.brand ?? "",
        rentalPrice: payload?.rentalPrice ?? "",
        minMileage: payload?.minMileage ?? "",
        maxMileage: payload?.maxMileage ?? "",
      };
      state.list = [];
      state.total = 0;
      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
    
    nextPage(state) {
      state.page += 1;
    },
    setLimit(state, { payload }) {
      state.limit = String(payload ?? state.limit);
    },
  },
  extraReducers: (builder) => {
      builder
          .addCase(fetchBrands.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

          .addCase(fetchBrands.fulfilled, (state, action) => {
            state.loading = false;
            state.brands = action.payload;
          })

          .addCase(fetchBrands.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to load brands";
          })

          .addCase(fetchCars.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

          .addCase(fetchCars.fulfilled, (state, action) => {
            state.loading = false;

           const itemsFromPayload = action.payload?.items ?? [];
           const pageFromPayload = Number(action.payload?.page ?? state.page ?? 1);
           const totalFromPayload = Number(action.payload?.total ?? state.total ?? 0);
          const totalPages = Number(action.payload?.totalPages ?? state.totalPages ?? 1);

      if (pageFromPayload <= 1) {
        state.list = itemsFromPayload;
      } else {
        state.list = [...state.list, ...itemsFromPayload];
      }

            state.page = pageFromPayload;
            state.total = totalFromPayload;
            state.totalPages = totalPages;
         })

        .addCase(fetchCars.rejected, (state, action) => {
           state.loading = false;
           state.error = action.payload || "Failed to load cars";
        })

    
        .addCase(fetchCarById.pending, (state) => {
           state.loading = true;
           state.error = null;
           state.current = null; 
        })

        .addCase(fetchCarById.fulfilled, (state, action) => {
           state.loading = false;
           state.current = action.payload || null;
        })

        .addCase(fetchCarById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to load car";
        });
  },
});

export const { resetList, applyFilters, nextPage, setLimit } = carsSlice.actions;
export default carsSlice.reducer;
