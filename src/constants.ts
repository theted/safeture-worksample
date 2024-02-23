export const API_BASE = "https://openexchangerates.org/api";
export const API_KEY = import.meta.env.VITE_API_KEY;

export const currencies = ["SEK", "EUR", "GBP", "CNY"];

export const currencySymbols: Record<string, string> = {
  SEK: "kr",
  EUR: "€",
  GBP: "£",
  CNY: "¥",
};
