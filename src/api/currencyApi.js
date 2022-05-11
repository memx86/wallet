async function fetchCurrency() {
  const res = await fetch(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
  );
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(new Error("not found"));
}

export default fetchCurrency;
