import { describe, it, expect } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { CurrencyConverter } from "./CurrencyConverter";
import "@testing-library/jest-dom";

const TEST_RATES = {
  SEK: 0.1,
  USD: 1,
  EUR: 0.88,
  GBP: 10,
  CNY: 5,
};

describe("CurrencyConverter", () => {
  it("renders without crashing", () => {
    render(<CurrencyConverter rates={TEST_RATES} />);
  });

  it("converts currency when value, fromCurrency, or toCurrency changes", async () => {
    const { getByText } = render(<CurrencyConverter rates={TEST_RATES} />);

    const [fromCurrencySelect, toCurrencySelect] =
      screen.getAllByRole("combobox");
    const valueInput = screen.getByRole("textbox");

    fireEvent.change(fromCurrencySelect, { target: { value: "SEK" } });
    fireEvent.change(toCurrencySelect, { target: { value: "USD" } });
    fireEvent.change(valueInput, { target: { value: "100" } });

    expect(fromCurrencySelect).toHaveValue("SEK");
    expect(toCurrencySelect).toHaveValue("USD");
    expect(valueInput).toHaveValue("100");

    await waitFor(() => getByText("100 kr = 1000 $"));
  });
});
