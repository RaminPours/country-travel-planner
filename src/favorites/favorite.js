const KEY = "favorites_countries_v1";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveFavorites(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addFavorite(country) {
  const list = getFavorites();
  const exists = list.some((x) => x.code === country.code);
  if (exists) return list;

  const next = [country, ...list];
  saveFavorites(next);
  return next;
}

export function removeFavorite(code) {
  const list = getFavorites();
  const next = list.filter((x) => x.code !== code);
  saveFavorites(next);
  return next;
}

export function isFavorite(code) {
  return getFavorites().some((x) => x.code === code);
}
