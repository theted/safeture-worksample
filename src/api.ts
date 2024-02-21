import { API_BASE, API_KEY, currencies } from "./constants";

export type CurrencyMap = { [key: string]: number };

export const apiCall = async (endpoint: string) => {
  return fetch(`${API_BASE}/${endpoint}.json?app_id=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getRates = async (): Promise<CurrencyMap> => {
  const { rates } = await apiCall("latest");

  return currencies.reduce((acc, currency) => {
    return { ...acc, [currency]: rates[currency] };
  }, {});
};

export const convertCurrency = (
  from: string,
  to: string,
  amount: number,
  rates: CurrencyMap
) => {
  const amountInUSD = amount / rates[from];
  const convertedAmount = amountInUSD * rates[to];
  return convertedAmount;
};
