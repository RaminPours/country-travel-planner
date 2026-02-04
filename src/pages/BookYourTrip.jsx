import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCountryByCode } from "../api/countriesApi";
import countryActivities from "../data/countryActivities";

export default function BookYourTrip() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  // fetch land data gebaseerd op code
  useEffect(() => {
    async function load() {
      const data = await fetchCountryByCode(code);
      setCountry(data);
    }
    load();
  }, [code]);

  if (!country) return <p>Loading booking...</p>;

  // haal info uit data
  const name = country.name.common;
  const capital = country.capital?.[0] || "—";

  // haal activiteiten op uit data of de standaard activiteiten
  const info = countryActivities[code] || {
    photo: country.flags?.png || "",
    activities: [
      `Stadswandeling in ${capital}`,
      "Bezoek een museum of historisch centrum",
      "Proef lokale gerechten",
    ],
  };


  return (
    <div>
      <Link to="/planner">← Terug naar Planner</Link>

      <h1>Trip naar {name} geboekt!</h1>

      {info.photo && (
        <img
          src={info.photo}
          style={{width: "100%", height: 650}}
        />
      )}

      <h2>Activiteiten</h2>
      <ul style={{fontSize: 20}}>
        {info.activities.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      
      <h2>Klik hier op google maps en zoek {name} op </h2>
       <iframe
        src="https://www.google.com/maps/embed/"
        title="google map"
        width={450}
        frameBorder={0}
        style={{ border: 0 }}
        />

    </div>
  );
}
