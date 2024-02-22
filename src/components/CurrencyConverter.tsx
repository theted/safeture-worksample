import { FC, FormEvent, ChangeEvent, useState, useEffect } from "react";
import { CurrencySelector } from "./CurrencySelector";
import { convertCurrency, CurrencyMap } from "../api";
import { currencies, currencySymbols } from "../constants";

type CurrencyConverterProps = {
  rates: CurrencyMap;
};

export const CurrencyConverter: FC<CurrencyConverterProps> = ({ rates }) => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [value, setValue] = useState(0);
  const [result, setResult] = useState(0);

  const handleSwitchFrom = (event: ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value);
  };

  const handleSwitchTo = (event: ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(event.target.value);
  };

  useEffect(() => {
    const currencyConvert = () => {
      const convertedAmount = convertCurrency(
        fromCurrency,
        toCurrency,
        value,
        rates
      );
      setResult(convertedAmount);
    };

    currencyConvert();
  }, [fromCurrency, toCurrency, value, rates]);

  return (
    <div>
      <input
        type="text"
        name="value"
        value={value}
        onChange={(e: FormEvent<HTMLInputElement>) => {
          setValue(Number(e.currentTarget.value));
        }}
      />

      <CurrencySelector
        name="from"
        value={fromCurrency}
        onChange={handleSwitchFrom}
        currencies={currencies}
      />

      <CurrencySelector
        name="to"
        value={toCurrency}
        onChange={handleSwitchTo}
        currencies={currencies}
      />

      <div id="result">
        {value} {currencySymbols[fromCurrency]} = {result}{" "}
        {currencySymbols[toCurrency]}
      </div>
    </div>
  );
};
