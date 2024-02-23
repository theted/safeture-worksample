import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CurrencyRates } from "./CurrencyRates";
import { TEST_RATES } from "../__test__/data";
import "@testing-library/jest-dom";

describe("CurrencyRates", () => {
  it("renders without crashing", () => {
    render(<CurrencyRates currency="SEK" rates={TEST_RATES} />);
  });

  it("renders currency rates correctly", async () => {
    render(<CurrencyRates currency="SEK" rates={TEST_RATES} />);

    const currencyElements = document.querySelectorAll(".rates li");

    expect(currencyElements[0].textContent).toBe("1 EUR = 11.11 SEK");
    expect(currencyElements[1].textContent).toBe("1 GBP = 13.33 SEK");
    expect(currencyElements[2].textContent).toBe("1 CNY = 2 SEK");
  });

  it("does not show rates for target currency", () => {
    const { queryByText } = render(
      <CurrencyRates currency="SEK" rates={TEST_RATES} />
    );

    expect(queryByText("1 SEK = 1 SEK")).not.toBeInTheDocument();
  });
});
