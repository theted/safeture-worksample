import { API_BASE, API_KEY, currencies } from "./constants";
import { getHoursDifference, toFixedIfNecessary } from "./helpers";
import { CurrencyMap } from "./types";

export const apiCall = async (endpoint: string) => {
  return fetch(`${API_BASE}/${endpoint}.json?app_id=${API_KEY}`).then(
    (response) => response.json()
  );
};

// TODO: refactor
export const getRates = async (): Promise<CurrencyMap> => {
  const localRates = localStorage.getItem("currencyRates");

  if (localRates) {
    const { timestamp, rates } = JSON.parse(localRates);
    const hoursDifference = getHoursDifference(timestamp);

    if (hoursDifference < 1) {
      return rates;
    }
  }

  const { rates } = await apiCall("latest");

  const currencyRates = currencies.reduce((acc, currency) => {
    return { ...acc, [currency]: rates[currency] };
  }, {});

  localStorage.setItem(
    "currencyRates",
    JSON.stringify({
      timestamp: new Date(),
      rates: currencyRates,
    })
  );

  return currencyRates;
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
