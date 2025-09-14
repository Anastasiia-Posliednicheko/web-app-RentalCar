import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/favorites/slice.js";
import { selectFavoritesIds } from "../../redux/favorites/selectors.js";
import { formatMileage, formatPrice, formatAddressShort } from "../../utils/format.js";
import css from "./CarCard.module.css";

function HeartIcon({ active }) {
  return (
    <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99978 1.31405C12.4378 -3.24795 23.5338 4.73505 7.99978 15.0001C-7.53422 4.73605 3.56178 -3.24795 7.99978 1.31405Z"
        fill={active ? "#3470ff" : "none"}
        stroke={active ? "#3470ff" : "#fff"}
        
    />
  </svg>
  );
}

export default function CarCard({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritesIds);
  const isFav = favorites?.has?.(car.id) || favorites?.includes?.(car.id);

  const toggleFav = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFav) dispatch(removeFavorite(car.id));
    else dispatch(addFavorite(car.id));
  };
  const { country, city } = formatAddressShort(car.address);
  

  return (
    <div>
      <div className={css.boxCar}>
        <button
          type="button"
          onClick={toggleFav}
          aria-pressed={isFav}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          title={isFav ? "In favorites" : "Add to favorites"}
          className={css.buttonFav}
        >
          <HeartIcon active={isFav} />
        </button>
        {car.img && (
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={css.img}
          />
        )}
      </div>

      <div className={css.name}>
        <div className={css.brand}>
          {car.brand} <span className={css.model}>{car.model}</span> ({car.year ?? car.yea})
        </div>
        <div className={css.price}>
          {formatPrice(car.rentalPrice)}
        </div>
      </div>
      <div className={css.blockBox}>
        <div className={css.block}>
         <div className={css.address}>{city}</div>
           <svg className={css.divider} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 16">
              <path d="M1 0V16" />
           </svg>
          <div className={css.address}>{country}</div>
            <svg className={css.divider} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 16">
              <path d="M1 0V16" />
            </svg>
          <div className={css.address}>{car.rentalCompany}</div>
             </div>
        <div className={css.block}>
          <div className={css.address}>{car.type}</div>
           <svg
             className={css.divider}
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 2 16"
              >
              <path d="M1 0V16" />
            </svg>
           <div className={css.address}>{formatMileage(car.mileage)}</div>
          </div>
      </div>
        <div className={css.button}>
          <Link to={`/catalog/${car.id}`} className={css.link} >
            Read more
        </Link>
      </div>
    </div>
  );
}
