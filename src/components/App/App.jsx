import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import Catalog from "../../pages/Catalog/Catalog.jsx";
import CarDetails from "../../pages/CarDetails/CarDetails.jsx";
import css from "./App.module.css"

export default function App() {
  return (
    <div >
      <header>
        <nav className={css.header}>
          <p>Icon</p>
          <div className={css.linkList}>
            <Link to="/" className={css.link}>Home</Link>
            <Link to="/catalog" className={css.link}>Catalog</Link>
          </div>
        </nav>
      </header>

      <main className={css.container}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CarDetails />} />
        </Routes>
      </main>
    </div>
  );
}
