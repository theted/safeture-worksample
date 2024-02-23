import { FC } from "react";
import { convertCurrency } from "../api";
import { CurrencyMap } from "../types";

type CurrencyRatesProps = {
  currency: string;
  rates: CurrencyMap;
};

export const CurrencyRates: FC<CurrencyRatesProps> = ({ currency, rates }) => {
  return (
    <div className="currencyRates">
      <h3>{currency}</h3>
      <ul className="rates">
        {Object.entries(rates).map(([rate]) => {
          return (
            rate !== currency && (
              <li key={rate}>
                1 {rate} = {convertCurrency(rate, currency, 1, rates)}{" "}
                {currency}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};
