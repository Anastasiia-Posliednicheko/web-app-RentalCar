import { createSlice } from "@reduxjs/toolkit";

function readFromStorage() {
  try {
    const raw = localStorage.getItem("favorites");
    return Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeToStorage(arr) {
  localStorage.setItem("favorites", JSON.stringify(arr));
}

const initialState = {
 
  ids: readFromStorage(), 
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const id = action.payload;
      if (!state.ids.includes(id)) {
        state.ids.push(id);
        writeToStorage(state.ids);
      }
    },
    removeFavorite(state, action) {
      const id = action.payload;
      state.ids = state.ids.filter((x) => x !== id);
      writeToStorage(state.ids);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
