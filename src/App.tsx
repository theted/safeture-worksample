import { useState, useEffect } from "react";
import { getRates, CurrencyMap } from "./api";
import { CurrencyConverter } from "./components/CurrencyConverter";
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

  useEffect(() => {
    getRates().then((rates): void => {
      setRates(rates);
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <h1>Currency converter</h1>
      <CurrencyConverter rates={rates} />
    </ThemeProvider>
  );
};

export default App;
