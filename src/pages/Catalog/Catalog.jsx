// src/pages/Catalog/Catalog.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchCars } from "../../redux/cars/operations.js";
import { applyFilters, resetList, nextPage } from "../../redux/cars/slice.js";
import {
  selectCars,
  selectCarsTotal,
  selectBrands,
  selectCarsLoading,
  selectCarsFilters,
  selectCarsPage,
  selectCarsLimit,
} from "../../redux/cars/selectors.js";
import Filters from "../../components/Filters/Filters.jsx";
import CarCard from "../../components/CarCard/CarCard.jsx";
import css from "./Catalog.module.css";

export default function Catalog() {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);
  const total = useSelector(selectCarsTotal);
  const loading = useSelector(selectCarsLoading);
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectCarsFilters);
  const page = useSelector(selectCarsPage);
  const limit = useSelector(selectCarsLimit);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(resetList());
    dispatch(fetchCars({ ...filters, page: "1", limit }));
  }, [dispatch]); 

  function handleApplyFilters(payload) {
    dispatch(applyFilters(payload));
    dispatch(fetchCars({ ...payload, page: "1", limit }));
  }

  function handleLoadMore() {
    const next = String(Number(page) + 1);
    dispatch(nextPage());
    dispatch(fetchCars({ ...filters, page: next, limit }));
  }

  const canLoadMore = cars.length < Number(total || 0);

  return (
    <div className={css.container}>
      <Filters brands={brands} initial={filters} onApply={handleApplyFilters} />

      {loading && cars.length === 0 && <p>Loading...</p>}
      {!loading && cars.length === 0 && <p>Not found...</p>}
      <ul className={css.carList}
      >
        {cars.map((car) => (
          <li key={car.id} className={css.car}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {canLoadMore && (
        <div>
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className={css.button}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
