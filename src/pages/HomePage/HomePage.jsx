import { useNavigate } from "react-router-dom";
import css from "./HomePage.module.css";

export default function Home() {
    const navigate = useNavigate();

    function handleClick() {
    navigate("/catalog");
  }

  return (
    <div className={css.homePage}>
      <div className={css.hero}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
          <button onClick={handleClick} className={css.button}>
            View Catalog
          </button>
      </div>
    </div>
  );
}
