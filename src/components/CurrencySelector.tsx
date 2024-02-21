import { FC } from "react";

type CurrencySelectorProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currencies: string[];
};

export const CurrencySelector: FC<CurrencySelectorProps> = ({
  name,
  value,
  onChange,
  currencies,
}) => (
  <select name={name} value={value} onChange={onChange}>
    {currencies.map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ))}
  </select>
);
