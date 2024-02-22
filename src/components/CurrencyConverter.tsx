import { FC, FormEvent, ChangeEvent, useState, useEffect } from "react";
import { CurrencySelector } from "./CurrencySelector";
import { convertCurrency, CurrencyMap } from "../api";
import { currencies, currencySymbols } from "../constants";
import { TextField, SelectChangeEvent } from "@mui/material";

type CurrencyConverterProps = {
  rates: CurrencyMap;
};

export const CurrencyConverter: FC<CurrencyConverterProps> = ({ rates }) => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [value, setValue] = useState(0);
  const [result, setResult] = useState("");

  const handleSwitchFrom = (event: SelectChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value);
  };

  const handleSwitchTo = (event: SelectChangeEvent<HTMLSelectElement>) => {
    setToCurrency(event.target.value);
  };

  const toFixedIfNecessary = (value: string, precision = 2) => {
    return +parseFloat(value).toFixed(precision);
  };

  useEffect(() => {
    const convertedAmount = convertCurrency(
      fromCurrency,
      toCurrency,
      value,
      rates
    );
    setResult(toFixedIfNecessary(convertedAmount));
  }, [fromCurrency, toCurrency, value, rates]);

  return (
    <div>
      <TextField
        type="text"
        name="value"
        value={value}
        onChange={(e: SelectChangeEvent<HTMLInputElement>) => {
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
