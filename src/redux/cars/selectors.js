export const selectCars = (state) => state.cars.list;
export const selectCarsTotal = (state) => state.cars.total;
export const selectCarsPage = (state) => state.cars.page;
export const selectCarsLimit = (state) => state.cars.limit;
export const selectCarsFilters = (state) => state.cars.filters;

export const selectBrands = (state) => state.cars.brands;
export const selectCurrentCar = (state) => state.cars.current;

export const selectCarsLoading = (state) => state.cars.loading;
export const selectCarsError = (state) => state.cars.error;

export const selectCarsTotalPages = (state) => state.cars.totalPages;
