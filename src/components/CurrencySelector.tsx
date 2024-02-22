import { FC } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

type CurrencySelectorProps = {
  name: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  currencies: string[];
};

export const CurrencySelector: FC<CurrencySelectorProps> = ({
  name,
  value,
  onChange,
  currencies,
}) => (
  <Select
    name={name}
    value={value}
    onChange={onChange}
    inputProps={{ "data-testid": name }}
  >
    {currencies.map((currency) => (
      <MenuItem key={currency} value={currency}>
        {currency}
      </MenuItem>
    ))}
  </Select>
);
