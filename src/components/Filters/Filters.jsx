import React, { useEffect, useState } from "react";
import BrandFilter from "./BrandFilter.jsx";
import PriceFilter from "./PriceFilter.jsx";
import MileageFilter from "./MileageFilter.jsx";
import css from "./Filters.module.css";

export default function Filters({ brands = [], initial, onApply }) {
  const [brand, setBrand] = useState(initial?.brand || "");
  const [rentalPrice, setRentalPrice] = useState(initial?.rentalPrice || "");
  const [minMileage, setMinMileage] = useState(initial?.minMileage || "");
  const [maxMileage, setMaxMileage] = useState(initial?.maxMileage || "");

  useEffect(() => {
    setBrand(initial?.brand || "");
    setRentalPrice(initial?.rentalPrice || "");
    setMinMileage(initial?.minMileage || "");
    setMaxMileage(initial?.maxMileage || "");
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();

    onApply?.({
      brand: String(brand || "").trim(),
      rentalPrice: String(rentalPrice || "").trim(),
      minMileage: String(minMileage || "").trim(),
      maxMileage: String(maxMileage || "").trim(),
    });
  }

  return (
    <div className={css.container}>
        <form
          onSubmit={handleSubmit}
          className= {css.form }
        >
          <BrandFilter
            brands={brands}
            value={brand}
            onChange={setBrand}
          />
          <PriceFilter
            value={rentalPrice}
            onChange={setRentalPrice}
            label="Price / 1 hour"
          />
          <MileageFilter
            minValue={minMileage}
            maxValue={maxMileage}
            onChangeMin={setMinMileage}
            onChangeMax={setMaxMileage}
            label="Car mileage / km"
          />
          <button type="submit" className={css.button}>Search</button>
        </form>
        
      </div>
  );
}
