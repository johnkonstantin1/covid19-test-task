// import React, { useState, useEffect } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
// import "./worldwide.css";

// const Worldwide = () => {
//   const [data, setData] = useState([]);
//   const [dateFrom, setDateFrom] = useState("2020-01-01T00:00:00Z");
//   const [dateTo, setDateTo] = useState("");
//   const [selectedCase, setSelectedCase] = useState("NewConfirmed");
//   const [lastDate, setLastDate] = useState("");

//   // const fetchData = async () => {
//   //   const response = await fetch(
//   //     `https://api.covid19api.com/world?from=${dateFrom}&to=${dateTo}`
//   //   );
//   //   const jsonData = await response.json();
//   //   const sortedData = jsonData.sort(
//   //     (a, b) => new Date(a.Date) - new Date(b.Date)
//   //   );
//   //   setData(sortedData);
//   // };

//   // useEffect(() => {
//   //   fetchData();
//   // }, [dateFrom, dateTo]);

//   const fetchData = async () => {
//     const response = await fetch(
//       `https://api.covid19api.com/world`
//     );
//     const jsonData = await response.json();
//     const sortedData = jsonData.sort(
//       (a, b) => new Date(a.Date) - new Date(b.Date)
//     );
//     const lastData = sortedData[sortedData.length - 1];
//     setDateTo(lastData.Date);
//     setData(sortedData);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (dateFrom !== "" && dateTo !== "") {
//       const fetchFilteredData = async () => {
//         const response = await fetch(
//           `https://api.covid19api.com/world?from=${dateFrom}&to=${dateTo}`
//         );
//         const jsonData = await response.json();
//         const sortedData = jsonData.sort(
//           (a, b) => new Date(a.Date) - new Date(b.Date)
//         );
//         setData(sortedData);
//       };
//       fetchFilteredData();
//     }
//   }, [dateFrom, dateTo]);

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "dateFrom") {
//       setDateFrom(value);
//     } else if (name === "dateTo") {
//       setDateTo(value);
//     } else if (name === "selectedCase") {
//       setSelectedCase(value);
//     }
//   };

//   return (
//     <div className="worldwide-container">
//       <h1 className="title-name">Worldwide Statistics Timeline</h1>
//       <div className="filter-container">
//         <label>
//           From:
//           <input
//             type="date"
//             name="dateFrom"
//             value={dateFrom}
//             onChange={handleFilterChange}
//           />
//         </label>
//         <label>
//           To:
//           <input
//             type="date"
//             name="dateTo"
//             value={dateTo}
//             onChange={handleFilterChange}
//           />
//         </label>
//         <label>
//           Case:
//           <select
//             name="selectedCase"
//             value={selectedCase}
//             onChange={handleFilterChange}
//           >
//             <option value="NewConfirmed">New Confirmed</option>
//             <option value="NewDeaths">New Deaths</option>
//             <option value="TotalDeaths">Total Deaths</option>
//             <option value="NewRecovered">New Recovered</option>
//             <option value="TotalRecovered">Total Recovered</option>
//           </select>
//         </label>
//       </div>
//       <div className="chart-container">
//         <LineChart width={900} height={400} data={data}>
//           <XAxis
//             dataKey="Date"
//             interval="preserveStartEnd"
//             tick={{ fontSize: 12 }}
//           />
//           <YAxis interval="preserveStartEnd" tick={{ fontSize: 12 }} />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey={selectedCase} stroke="#8884d8" />
//         </LineChart>
//       </div>
//     </div>
//   );
// };

// export default Worldwide;

import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./worldwide.css";

const Worldwide = () => {
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState("2020-01-01T00:00:00Z");
  const [dateTo, setDateTo] = useState("");
  const [selectedCase, setSelectedCase] = useState("NewConfirmed");
  const [lastDate, setLastDate] = useState("");

  const fetchData = async () => {
    const response = await fetch(
      `https://api.covid19api.com/world?from=${encodeURIComponent(
        dateFrom
      )}&to=${encodeURIComponent(dateTo)}&case=${encodeURIComponent(
        selectedCase
      )}`
    );

    const jsonData = await response.json();
    const sortedData = jsonData.sort(
      (a, b) => new Date(a.Date) - new Date(b.Date)
    );
    setData(sortedData);
  };

  useEffect(() => {
    fetchData();
  }, [dateFrom, dateTo]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "dateFrom") {
      setDateFrom(value);
    } else if (name === "dateTo") {
      setDateTo(value);
    } else if (name === "selectedCase") {
      setSelectedCase(value);
    }
  };

  return (
    <div className="worldwide-container">
      <h1 className="title-name">Worldwide Statistics Timeline</h1>
      <div className="filter-container">
        <label>
          From:
          <input
            type="date"
            name="dateFrom"
            value={dateFrom}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            name="dateTo"
            value={dateTo}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Case:
          <select
            name="selectedCase"
            value={selectedCase}
            onChange={handleFilterChange}
          >
            <option value="NewConfirmed">New Confirmed</option>
            <option value="NewDeaths">New Deaths</option>
            <option value="TotalDeaths">Total Deaths</option>
            <option value="NewRecovered">New Recovered</option>
            <option value="TotalRecovered">Total Recovered</option>
          </select>
        </label>
      </div>
      <div className="chart-container">
        <LineChart width={900} height={400} data={data}>
          <XAxis
            dataKey="Date"
            interval="preserveStartEnd"
            tick={{ fontSize: 12 }}
          />
          <YAxis interval="preserveStartEnd" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={selectedCase} stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default Worldwide;
