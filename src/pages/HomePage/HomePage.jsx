import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    function handleClick() {
    navigate("/catalog");
  }

  return (
    <div>
      <h1>Find your perfect rental car</h1>
      <p>Reliable and budget-friendly rentals for any journey</p>
        <button onClick={handleClick}>
          View Catalog
        </button>
    </div>
  );
}
