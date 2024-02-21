import { useState, useEffect } from "react";
import { getRates, CurrencyMap } from "./api";
import { CurrencyConverter } from "./components/CurrencyConverter";
import "./App.css";

const App = () => {
  const [rates, setRates] = useState<CurrencyMap>({});

  useEffect(() => {
    getRates().then((rates): void => {
      setRates(rates);
    });
  }, []);

  return (
    <>
      <div>
        <h1>Currency converter</h1>
        <CurrencyConverter rates={rates} />
      </div>
    </>
  );
};

export default App;
