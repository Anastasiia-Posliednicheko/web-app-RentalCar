import css from "./Loader.module.css";

export default function Loader({ type = "page", label = "Loading…" }) {
  if (type === "inline") {
    return (
      <span className={css.inline} role="status" aria-live="polite" aria-busy="true">
        <span className={css.ring} />
        {label && <span className={css.label}>{label}</span>}
      </span>
    );
  }

  return (
    <div className={css.backdrop} role="status" aria-live="polite" aria-busy="true">
      <div className={css.box}>
        <span className={css.ring} />
        <span className={css.label}>{label}</span>
      </div>
    </div>
  );
}
