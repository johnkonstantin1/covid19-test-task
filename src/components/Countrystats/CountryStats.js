import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./CountryStats.css";

const CountryStats = () => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [cases, setCases] = useState("");

  useEffect(() => {
    const cachedCountries = sessionStorage.getItem("countries");
    if (cachedCountries) {
      setCountries(JSON.parse(cachedCountries));
    } else {
      // If countries list is not cached in sessionStorage, fetch it from API
      fetch("https://api.covid19api.com/countries")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
          // Cache the countries list in sessionStorage
          sessionStorage.setItem("countries", JSON.stringify(data));
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let apiUrl = `https://api.covid19api.com/live/country/${country}`;
    if (dateFrom) {
      apiUrl += `?date_from=${dateFrom}`;
    }
    if (cases) {
      apiUrl += `${dateFrom ? "&" : "?"}status=${cases}`;
    }
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    setData(jsonData);
  };

  return (
    <div className="country-container">
      <h1>Live Statistics</h1>
      <div className="chart-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="country">Select a country:</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((c) => (
              <option key={c.ISO2} value={c.Slug}>
                {c.Country}
              </option>
            ))}
          </select>
          <label htmlFor="date">From date:</label>
          <input
            type="date"
            id="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <label htmlFor="cases">Select cases:</label>
          <select
            id="cases"
            value={cases}
            onChange={(e) => setCases(e.target.value)}
          >
            <option value="">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="deaths">Deaths</option>
            <option value="recovered">Recovered</option>
          </select>
          <button type="submit">Show stats</button>
        </form>
        <LineChart width={900} height={400} data={data}>
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Confirmed" stroke="#8884d8" />
          <Line type="monotone" dataKey="Deaths" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Recovered" stroke="#ffc658" />
        </LineChart>
      </div>
    </div>
  );
};

export default CountryStats;
