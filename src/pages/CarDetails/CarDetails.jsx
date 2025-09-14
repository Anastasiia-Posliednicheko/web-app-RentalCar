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
import { firstFourId } from "../../utils/format";
import { LuMapPin } from "react-icons/lu"; 
import { LuCircleCheck } from "react-icons/lu";
import {
  LuCalendar,     
  LuCar,          
  LuFuel,         
  LuGauge,        
  LuInfo          
} from "react-icons/lu";


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
  
  const specIconMap = {
  Year: LuCalendar,
  Type: LuCar,
  "Fuel Consumption": LuFuel,
  "Engine Size": LuGauge,
};



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
    <section className={css.container}>
      <div className={css.containerSection}>
                 <div className={css.grid}>
                       <div className={css.leftCol}>
                           {car.img && (
                               <img
                                 src={car.img}
                                 alt={`${car.brand} ${car.model}`}
                                 className={css.img}
                                />
                              )}

                              <RentForm car={car} />
                         </div>

            <div  className={css.boxCar}>
                <div className={css.infoCar}>
                     <div className={css.oneInfo}>
                       <h2 className={css.car}>
                          {car.brand} {car.model}, {car.year}
                       </h2>
                      <div className={css.id}><span>Id:</span> {firstFourId(car.id)}</div>
                    </div>
                        <div className={css.oneInfo}>
                          {(city || country) && (
                              <div className={css.address}> <LuMapPin className={css.icon} /><span>{[city, country].filter(Boolean).join(" | ")}</span></div>
                          )}
                          {car.mileage != null && (
                              <div  className={css.address}><span>Mileage:</span> {formatMileage(car.mileage)}</div>
                          )}
                        </div>
                  <div className={css.price}>{formatPrice(car.rentalPrice)}</div>
          
                       {car.description && (
                         <p className={css.text}>
                           {car.description}
                        </p>
                         )}
                </div> 
                 <div className={css.carList}>
                   {conditions.length > 0 && (
                                    <div>
                                     <h3 className={css.details}>Rental Conditions:</h3>
                                        <ul className={css.detailsList}>
                                          {conditions.map((c, i) => (
                                            <li key={i} className={css.detailsItem} ><LuCircleCheck className={css.icon} /><span>{c}</span></li>
                                           ))}
                                        </ul>
                                    </div>
                                   )}
                   {specs.length > 0 && (
                                   <div>
                         <h3 className={css.details}>Car Specifications:</h3>
                            <ul className={css.detailsList}>
                              {specs.map((s, i) => {
                                const Icon = specIconMap[s.label] || LuInfo;
                                  return (
                                    <li key={i} className={css.detailsItem}>
                                      <Icon className={css.specIcon} aria-hidden="true" focusable="false" />
                                      <span className={css.specLabel}>{s.label}:</span>
                                      <span className={css.specValue}>{s.value}</span>
                                    </li>
                                     );
                                 })}
                             </ul>
                                   </div>
                     )}
                    {extras.length > 0 && (
                                   <div>
                         <h3 className={css.details}>Accessories and functionalities:</h3>
                          <ul className={css.detailsList}>
                            {extras.map((x, i) => (
                              <li key={i} className={css.detailsItem} ><LuCircleCheck className={css.icon} /><span>{x}</span></li>
                             ))}
                          </ul>
                   </div>
                      )}
                 </div>
             </div>
      </div>
    </div>    

    </section>
  );
}
