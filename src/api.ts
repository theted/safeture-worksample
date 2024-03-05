import { API_BASE, API_KEY, currencies } from "./constants";
import { getHoursDifference, toFixedIfNecessary } from "./helpers";
import { CurrencyMap } from "./types";

export const apiCall = async (endpoint: string) => {
  return fetch(`${API_BASE}/${endpoint}.json?app_id=${API_KEY}`).then(
    (response) => response.json()
  );
};

const getRatesFromLocalStorage = (): {
  rates: CurrencyMap;
  hoursDifference: number;
} | null => {
  const localRates = localStorage.getItem("currencyRates");

  if (!localRates) return null;

  const { timestamp, rates } = JSON.parse(localRates);
  const hoursDifference = getHoursDifference(timestamp);

  return { rates, hoursDifference };
};

const getRatesFromApi = async (): Promise<CurrencyMap> => {
  const { rates } = await apiCall("latest");

  return currencies.reduce((acc, currency) => {
    return { ...acc, [currency]: rates[currency] };
  }, {});
};

const storeRatesInLocalStorage = (rates: CurrencyMap): void => {
  localStorage.setItem(
    "currencyRates",
    JSON.stringify({
      timestamp: new Date(),
      rates,
    })
  );
};

export const getRates = async (): Promise<CurrencyMap> => {
  const localRates = getRatesFromLocalStorage();

  if (localRates && localRates.hoursDifference < 1) {
    return localRates.rates;
  }

  const apiRates = await getRatesFromApi();
  storeRatesInLocalStorage(apiRates);

  return apiRates;
};

export const convertCurrency = (
  from: string,
  to: string,
  amount: number,
  rates: CurrencyMap
) => {
  const amountInUSD = amount / rates[from];
  const convertedAmount = amountInUSD * rates[to];
  return toFixedIfNecessary(convertedAmount.toString());
};
