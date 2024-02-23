import { describe, it, expect } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { CurrencyConverter } from "./CurrencyConverter";
import { TEST_RATES } from "../__test__/data";
import "@testing-library/jest-dom";

describe("CurrencyConverter", () => {
  it("renders without crashing", () => {
    render(<CurrencyConverter rates={TEST_RATES} />);
  });

  it("converts currency when value, fromCurrency, or toCurrency changes", async () => {
    const { getByText, getByTestId } = render(
      <CurrencyConverter rates={TEST_RATES} />
    );

    const fromCurrencySelect = getByTestId("from");
    const toCurrencySelect = getByTestId("to");
    const valueInput = screen.getByRole("textbox");

    fireEvent.change(fromCurrencySelect, { target: { value: "SEK" } });
    fireEvent.change(toCurrencySelect, { target: { value: "EUR" } });
    fireEvent.change(valueInput, { target: { value: "100" } });

    expect(fromCurrencySelect).toHaveValue("SEK");
    expect(toCurrencySelect).toHaveValue("EUR");
    expect(valueInput).toHaveValue("100");

    await waitFor(() => getByText("100 kr = 9 €"));

    fireEvent.change(fromCurrencySelect, { target: { value: "EUR" } });
    fireEvent.change(toCurrencySelect, { target: { value: "GBP" } });
    fireEvent.change(valueInput, { target: { value: "10" } });

    expect(fromCurrencySelect).toHaveValue("EUR");
    expect(toCurrencySelect).toHaveValue("GBP");
    expect(valueInput).toHaveValue("10");

    await waitFor(() => getByText("10 € = 8.33 £"));
  });
});
