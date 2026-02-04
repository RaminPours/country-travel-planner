import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCountryByCode } from "../api/countriesApi";
import countryExtras from "../data/countryExtras";
import { addFavorite, isFavorite, removeFavorite } from "../favorites/favorite";

export default function CountryDetailPage() {
  const { code } = useParams();
  const extras = countryExtras[code];

  const [country, setCountry] = useState(null);

  const navigate = useNavigate();

  // check of land favoriet is
  const fav = country ? isFavorite(country.cca3) : false;

  // fetch land data gebaseerd op code
  useEffect(() => {
    async function loadCountry() {
      const data = await fetchCountryByCode(code);
      setCountry(data);
    }

    loadCountry();
  }, [code]);

  if (!country) {
    return <p>Loading country...</p>;
  }

  return (
    <div className="country-detail">
      <Link to="/countries">← Back</Link>

      <button
        className="favorite-button"
        onClick={() => {
          const item = {
            code: country.cca3,
            name: country.name.common,
            flag: country.flags?.png || "",
            region: country.region || "",
            capital: country.capital?.[0] || "",
          };

          if (fav) {
            removeFavorite(item.code);
          } else {
            addFavorite(item);
            navigate("/planner");
          }
        }}
      >
        {fav ? "★ Verwijder uit favorieten" : "☆ Voeg toe aan favorieten"}
      </button>

      <h1>{country.name.common}</h1>

      <div>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>

      <p><strong>Hoofdstad:</strong> {country.capital?.[0]}</p>
      <p><strong>Regio:</strong> {country.region}</p>
      <p><strong>Aantal inwoners:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Taal:</strong> {country.languages ? Object.values(country.languages).join(", ") : "Geen informatie beschikbaar"}</p>

      <p>
        <strong>Munteenheid:</strong>{" "}
        {country.currencies
          ? Object.values(country.currencies).map((c) => c.name).join(", ")
          : "Geen info"}
      </p>

      <hr />

      {extras?.history && (
        <>
          <h2>Korte geschiedenis van {country.name.common}</h2>
          <p>{extras.history}</p>
        </>
      )}
    </div>
  );
}
