 import { useEffect, useRef } from "react";
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
   selectCarsError,
 } from "../../redux/cars/selectors.js";
 import Filters from "../../components/Filters/Filters.jsx";
 import CarCard from "../../components/CarCard/CarCard.jsx";
import toast from "react-hot-toast";
 import Loader from "../../components/Loader/Loader.jsx";
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
   const error = useSelector(selectCarsError);


  const appliedRef = useRef(false);

   useEffect(() => {
     dispatch(fetchBrands());
     dispatch(resetList());
     dispatch(fetchCars({ ...filters, page: "1", limit }));
   }, [dispatch]); 

  useEffect(() => {
    if (error) {
      toast.error(typeof error === "string" ? error : "Failed to load cars");
    }
  }, [error]);


  useEffect(() => {
    if (!loading && appliedRef.current && cars.length === 0) {
      toast("No cars match your filters");
      appliedRef.current = false; 
    }
  }, [loading, cars.length]);

   function handleApplyFilters(payload) {
    appliedRef.current = true;
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

       {loading && cars.length === 0 && <Loader type="page" label="Loading cars…" />}
       {!loading && cars.length === 0 && <p>Not found...</p>}
       <ul className={css.carList}>
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
            {loading
            ? <Loader type="inline" label="Loading…" />
            : "Load More"}
           </button>
         </div>
       )}
     </div>
   );
 }
