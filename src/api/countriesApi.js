const URL = 'https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,languages,borders,population,flags,currency';

export default async function fetchAllCountries() {
    const response = await fetch(`${URL}`);
    if (!response.ok) {
        throw new Error('Could not fetch data');
    }
    return response.json();
}

async function fetchCountryByCode(code) {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${code}`
  );

  if (!response.ok) {
    throw new Error("Could not fetch country");
  }

  const data = await response.json();
  return data[0]; 
}

export { fetchCountryByCode };




