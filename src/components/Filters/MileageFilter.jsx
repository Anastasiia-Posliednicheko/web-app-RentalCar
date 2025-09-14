import css from "./BrandFilter.module.css";

const MILEAGE_MAX_DIGITS = 4;
const formatThousands = (digits) =>
  digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";

export default function MileageFilter({
  minValue = "",
  maxValue = "",
  onChangeMin,
  onChangeMax,
  label = "Car mileage / km",
}) {
  return (
    <div className={css.brand}>
      <span
        id="mileageLabel"
        className={css.nameBrand}
      >
        {label}
      </span>

      <div
        role="group"
        aria-labelledby="mileageLabel"
         className={css.mileageGroup}
      >
        <div
          className={css.from}
        >
          <span className={css.text}>From</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatThousands(minValue)}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              const clipped = onlyDigits.slice(0, MILEAGE_MAX_DIGITS);
              onChangeMin?.(clipped);
            }}
            aria-label="Mileage from"
            className={css.input}
          />
        </div>
        <div
          className={css.from}
        >
          <span className={css.textFrom}>To</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatThousands(maxValue)}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              const clipped = onlyDigits.slice(0, MILEAGE_MAX_DIGITS);
              onChangeMax?.(clipped);
            }}
            aria-label="Mileage to"
            className={css.input}
          />
        </div>
      </div>
    </div>
  );
}
