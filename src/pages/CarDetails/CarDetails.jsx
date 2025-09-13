import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCarById } from "../../redux/cars/operations.js";
import {
  selectCurrentCar,
  selectCarsLoading,
  selectCarsError,
} from "../../redux/cars/selectors.js";
import { formatMileage, formatPrice, formatAddressShort } from "../../utils/format.js";
import RentForm from "../../components/RentForm/RentForm.jsx";
import css from "./CarDetails.module.css";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectCurrentCar);
  const loading = useSelector(selectCarsLoading);


  useEffect(() => {
    if (id) dispatch(fetchCarById(id));
  }, [id, dispatch]);

 if (loading && !car) return <p>Loading...</p>;
 if (!car) return <p>Car not found.</p>;


  const conditions = Array.isArray(car.rentalConditions)
    ? car.rentalConditions
    : car.rentalConditions
    ? [car.rentalConditions]
    : [];

  const specs = [
    { label: "Year", value: car.year },
    { label: "Type", value: car.type },
    { label: "Fuel Consumption", value: car.fuelConsumption },
    { label: "Engine Size", value: car.engineSize },
  ].filter(i => i.value !== undefined && i.value !== null && i.value !== "");

  const extras = [
    ...(Array.isArray(car.accessories) ? car.accessories : []),
    ...(Array.isArray(car.functionalities) ? car.functionalities : []),
  ];
  const { country, city } = formatAddressShort(car.address ?? "")

  return (
    <div className={css.container}>
      <div className={css.containerSection}>
                 {car.img && (
                     <img
                        src={car.img}
                        alt={`${car.brand} ${car.model}`}
                        className={css.img}
                     />
                    )}
            <div  className={css.boxCar}>
                <div className={css.infoCar}>
                     <h2 className={css.car}>
                        {car.brand} {car.model}, {car.year}
                     </h2>
                  <div className={css.id}><strong>ID:</strong> {car.id}</div>
                        {(city || country) && (
                  <div className={css.address}><strong>{[city, country].filter(Boolean).join(" | ")}</strong></div>
                        )}
                       {car.mileage != null && (
                  <div  className={css.address}><strong>Mileage:</strong> {formatMileage(car.mileage)}</div>
                        )}
                  <div className={css.price}>{formatPrice(car.rentalPrice)}</div>
          
                       {car.description && (
                         <p className={css.text}>
                           {car.description}
                        </p>
                         )}
                </div> 
                 {conditions.length > 0 && (
                <div>
                      <h3 className={css.details}>Rental Conditions:</h3>
                        <ul className={css.detailsList}>
                          {conditions.map((c, i) => (
                            <li key={i}>{c}</li>
                             ))}
                        </ul>
                 </div>
                )}
          
                 {specs.length > 0 && (
                <div>
                       <h3 className={css.details}>Car Specifications:</h3>
                          <ul className={css.detailsList}>
                           {specs.map((s, i) => (
                             <li key={i}>
                               {s.label}: {s.value}
                             </li>
                             ))}
                          </ul>
                </div>
                   )}
          
                  {extras.length > 0 && (
                <div>
                       <h3 className={css.details}>Accessories and functionalities:</h3>
                        <ul className={css.detailsList}>
                          {extras.map((x, i) => (
                            <li key={i}>{x}</li>
                           ))}
                        </ul>
                 </div>
                    )}
             </div>
        
      </div>
               <div>
                 <h3 className={css.title}>Book your car now</h3>
                  <p className={css.subTitle}>Stay connected! We are always ready to help you.</p>
                   <RentForm car={car} />
               </div>

    </div>
  );
}
