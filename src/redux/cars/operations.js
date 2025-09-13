import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios.js";


function buildQuery(params = {}) {
  const raw = {
    brand: params.brand,
    rentalPrice: params.rentalPrice,
    minMileage: params.minMileage,
    maxMileage: params.maxMileage,
    limit: params.limit ?? "12",
    page: params.page ?? "1",
  };
  const query = {};
  for (const [k, v] of Object.entries(raw)) {
    if (v === "" || v === undefined || v === null) continue;
    const s = String(v).trim();
    if (s !== "") query[k] = s;
  }
  return query;
}

export const fetchBrands = createAsyncThunk(
  "cars/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/brands");

     
      let list = [];
      if (Array.isArray(data)) list = data;
      else if (data && Array.isArray(data.brands)) list = data.brands;
      else if (data && Array.isArray(data.items)) list = data.items;
      else if (data && typeof data === "object") {
        list = Object.values(data).filter((v) => typeof v === "string");
      }

      list = list.map((s) => String(s).trim()).filter(Boolean);
      return list;
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = buildQuery(params);
      const { data } = await api.get("/cars", { params: query });
      if (Array.isArray(data)) {
        return { items: data, total: data.length, page: Number(query.page), totalPages: 1 };
      }
      return {
        items: Array.isArray(data.cars) ? data.cars : [],
        total: Number(data.totalCars ?? 0),
        page: Number(data.page ?? query.page ?? 1),
        totalPages: Number(data.totalPages ?? 1),
      };
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/cars/${id}`);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data || e.message);
    }
  }
);