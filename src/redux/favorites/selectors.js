export const selectFavoritesIds = (state) => state.favorites.ids;
export const selectFavoritesSet = (state) => new Set(state.favorites.ids);
//export const selectIsFavorite =(id) => (state) => state.favorites.ids.includes(id);
