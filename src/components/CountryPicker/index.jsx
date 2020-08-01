import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./country.module.css";

import { countries } from "../../api";

export default function CountryPicker({ handleCountryChange }) {
  const [countriesFetch, setCountries] = useState([]);

  useEffect(() => {
    async function countryFetch() {
      setCountries(await countries());
    }
    countryFetch();
  }, [setCountries]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {countriesFetch.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
