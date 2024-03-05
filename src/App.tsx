import { useState, useEffect } from "react";
import { getRates } from "./api";
import { CurrencyMap } from "./types";
import { CurrencyConverter } from "./components/CurrencyConverter";
import { CurrencyRates } from "./components/CurrencyRates";
import { Spinner } from "./components/Spinner";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const [rates, setRates] = useState<CurrencyMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getRates()
      .then((rates): void => {
        setRates(rates);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {loading && !error && <Spinner />}

      {!loading && !error && (
        <div className="fade-in">
          <h1>Currency converter</h1>
          <CurrencyConverter rates={rates} />

          <hr />

          <h2>Exchange rates</h2>
          <div className="currencyContainer">
            {Object.keys(rates).map((currency) => {
              return (
                <CurrencyRates
                  key={currency}
                  currency={currency}
                  rates={rates}
                />
              );
            })}
          </div>
        </div>
      )}

      {error && <p>Error fetching exchange rates...</p>}
    </ThemeProvider>
  );
};

export default App;
