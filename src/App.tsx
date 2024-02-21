import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { currencies, currencySymbols } from "./constants";
import { getRates, convertCurrency } from "./api";
import "./App.css";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [value, setValue] = useState(0);
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState(0);

  const handleSwitchFrom = (event: ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value);
  };

  const handleSwitchTo = (event: ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(event.target.value);
  };

  useEffect(() => {
    const currencyConvert = async () => {
      const convertedAmount = convertCurrency(
        fromCurrency,
        toCurrency,
        value,
        rates
      );
      setResult(await convertedAmount);
    };

    currencyConvert();
  }, [fromCurrency, rates, toCurrency, value]);

  useEffect(() => {
    getRates().then((rates): void => {
      setRates(rates);
    });
  }, []);

  return (
    <>
      <div>
        <h1>Currency converter</h1>

        <input
          type="text"
          name="value"
          value={value}
          onInput={(e: FormEvent<HTMLInputElement>) => {
            setValue(Number(e.currentTarget.value));
          }}
        />

        <select name="from" onChange={handleSwitchFrom} value={fromCurrency}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <select name="to" onChange={handleSwitchTo} value={toCurrency}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <div id="result">
          {value} {currencySymbols[fromCurrency]} = {result}{" "}
          {currencySymbols[toCurrency]}
        </div>
      </div>
    </>
  );
};

export default App;
