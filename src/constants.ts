export const API_BASE = "https://openexchangerates.org/api";
export const API_KEY = import.meta.env.VITE_API_KEY;

export const currencies = ["SEK", "USD", "EUR", "GBP", "CNY"];

type CurrencySymbols = {
  [key: string]: string;
};

export const currencySymbols: CurrencySymbols = {
  SEK: "kr",
  USD: "$",
  EUR: "€",
  GBP: "£",
  CNY: "¥",
};
