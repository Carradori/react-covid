import React from "react";

import { fetchData } from "./api";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./app.module.css";

export default class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data, country });
  };

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img
          className={styles.image}
          src={require("./assets/image.png")}
          alt="Covid-19"
        />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
