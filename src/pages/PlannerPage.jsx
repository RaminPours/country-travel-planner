import { useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, removeFavorite } from "../favorites/favorite";


export default function PlannerPage() {
  // haal favorieten op
  const [favorites, setFavorites] = useState(getFavorites());

  if (favorites.length === 0) {
    return (
      <div>
        <p>Nog geen favorieten </p>
        <Link to="/countries">Kies hier je favoriete land</Link>
      </div>
    );
  }

return (
    <div className="planner-page">
      <h1>Plan en kies je favoriete bestemming!</h1>
    <hr></hr>
      <div className="fav-grid">
        {favorites.map((c) => (
          <div key={c.code} className="fav-card">
            <Link to={`/countries/${c.code}`} className="fav-link">
              {c.flag && <img src={c.flag} alt={`${c.name} flag`} />}
              <h3>{c.name}</h3>
              <p>Klik voor meer info!</p>
            </Link>

            <button
              className="remove-btn"
              onClick={() => {
                removeFavorite(c.code);
                setFavorites(getFavorites());
              }}
            >
              Remove
            </button>
            <Link
              className="book-btn"
              to={`/book/${c.code}`}
              >Boek nu
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}
