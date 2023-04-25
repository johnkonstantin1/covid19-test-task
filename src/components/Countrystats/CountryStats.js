import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./CountryStats.css";

const CountryStats = () => {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [dateFrom, setDateFrom] = useState("2020-01-01T00:00:00Z");
  const [cases, setCases] = useState("Confirmed");

  useEffect(() => {
    const cachedCountries = sessionStorage.getItem("countries");
    if (cachedCountries) {
      setCountries(JSON.parse(cachedCountries));
    } else {
      fetch("https://api.covid19api.com/countries")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
          sessionStorage.setItem("countries", JSON.stringify(data));
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.covid19api.com/country/${country}?from=${dateFrom}&to=2023-04-24T00:00:00Z&status=${cases}`
    );
    const jsonData = await response.json();
    setData(jsonData);
  
    const queryParams = new URLSearchParams({
      country,
      dateFrom,
      cases,
    });
    window.history.replaceState(null, null, `?${queryParams}`);
  };
  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryParam = urlParams.get("country");
    const dateFromParam = urlParams.get("dateFrom");
    const casesParam = urlParams.get("cases");

    if (countryParam) {
      setCountry(countryParam);
    }
    if (dateFromParam) {
      setDateFrom(dateFromParam);
    }
    if (casesParam) {
      setCases(casesParam);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams({
      country,
      dateFrom,
      cases,
    });
    window.history.replaceState(null, null, `?${queryParams}`);
  }, [country, dateFrom, cases]);

  return (
    <div className="country-container">
      <h1>Country Statistics of {country}</h1>
      <div className="chart-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="country">Enter a country:</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">--Please choose a country--</option>
            {countries.map((country) => (
              <option key={country.Slug} value={country.Slug}>
                {country.Country}
              </option>
            ))}
          </select>

          <label htmlFor="dateFrom">Select a date from:</label>
          <input
            id="dateFrom"
            type="date"
            value={dateFrom.slice(0, 10)}
            onChange={(e) => setDateFrom(e.target.value + "T00:00:00Z")}
            max="2023-04-24"
          />

          <label htmlFor="cases">Select cases:</label>
          <select
            id="cases"
            value={cases}
            onChange={(e) => setCases(e.target.value)}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Deaths">Deaths</option>
            <option value="Recovered">Recovered</option>
          </select>

          <button type="submit">Show stats</button>
        </form>

        <LineChart
          width={800}
          height={500}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={cases}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default CountryStats;
