import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchAllCountries from "../api/countriesApi";

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch land data bij laden component
  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
      } catch {
        setError("Failed to fetch data!!!");
      } finally {
        setLoading(false);
      }
    }

    loadCountries();
  }, []);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  if (error) {
    return <p style={{ color: "red", fontSize: 25 }}>{error}</p>;
  }

  // sorteer landen van a-z
  const sortedCountries = [...countries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  return (
    <div>
      <ul className="countries-grid">
        {sortedCountries.map((c) => (
          <li key={c.cca3}>
            <Link to={`/countries/${c.cca3}`}>
              {c.name?.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

