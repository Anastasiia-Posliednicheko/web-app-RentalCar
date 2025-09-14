import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./HomePage.module.css";

export default function Home() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  function handleClick() {
    setPending(true);
    navigate("/catalog");
  }

  return (
    <div className={css.homePage}>
      <div className={css.hero}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>

        <button
          onClick={handleClick}
          className={css.button}
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? <Loader type="inline" label="Opening…" /> : "View Catalog"}
        </button>
      </div>
    </div>
  );
}
