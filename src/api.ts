import { API_BASE, API_KEY } from "./constants";
import { currencies } from "./types";

export const apiCall = async (endpoint: string) => {
  return fetch(`${API_BASE}/${endpoint}.json?app_id=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getRates = async (): Promise<{ [key: string]: number }> => {
  const { rates } = await apiCall("latest");

  return currencies.reduce((acc, currency) => {
    return { ...acc, [currency]: rates[currency] };
  }, {});
};

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number,
  rates: { [key: string]: number }
) => {
  const amountInUSD = amount / rates[from];
  const convertedAmount = amountInUSD * rates[to];
  return convertedAmount;
};
