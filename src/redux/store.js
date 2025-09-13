import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../redux/cars/slice.js";
import favoritesReducer from "../redux/favorites/slice.js";


export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: favoritesReducer
  },
});
