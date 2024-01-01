import React, { useState, useEffect } from "react";
import * as d3 from "d3";

export default function History(props) {
  const [historicalWeatherData, setHistoricalWeatherData] = useState([]);
  const [hDate, setHDate] = useState([]);
  const apiKey = "6c119f9082364891872a340604a40cf5";
  const city = props.city;

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const startDateString = startDate.toISOString().split("T")[0];

  const historyApiUrl = `https://api.weatherbit.io/v2.0/history/energy?city=${city}
  }&start_date=${startDateString}&end_date=${endDate}&key=${apiKey}&tp=daily`;

  useEffect(() => {
    fetch(historyApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setHistoricalWeatherData(data.data);
      })
      .catch((error) =>
        console.error("Error fetching historical data:", error)
      );
  }, [historyApiUrl]);

  useEffect(() => {
    const svg = d3.select("#historical-chart");

    const formattedArray = historicalWeatherData.map((dateString) => {
      const date = new Date(dateString.date);
      const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
        date
      );
      const day = date.getDate();
      return `${month}-${day}`;
    });

    setHDate(formattedArray);

    svg
      .selectAll("rect")
      .data(historicalWeatherData)
      .join("rect")
      .attr("x", (d, i) => i * (50 + 45))
      .attr("y", (d) => 70 - d.temp)
      .attr("width", 30)
      .attr("height", (d) => d.temp + 180)
      .attr("fill", "blue");
  }, [historicalWeatherData]);

  console.log(
    "history : ->",
    historicalWeatherData.map((item, i) => item.date)
  );

  return (
    <div className="h-80 my-5 w-full bg-white shadow-md rounded-2xl">
      <h2 className="text-start ps-6 pt-2 size-5 font-bold text-gray-500 text-2xl">
        History
      </h2>
      {historicalWeatherData && historicalWeatherData.length === 0 ? (
        <div>Loading historical data...</div>
      ) : (
        <div className="h-72 relative flex justify-center text-center">
          <div className="w-88 absolute bottom-16">
            <svg id="historical-chart" width="600" height="240"></svg>
          </div>
          <div className="absolute w-full flex justify-center bottom-6">
            {historicalWeatherData.map((item, i) => (
              <div className="w-24">
                <p>{item.temp} °C</p>
              </div>
            ))}
          </div>
          <div className="absolute w-full flex justify-center bottom-0">
            {hDate.map((item, i) => (
              <div className="w-24">
                <p className="mx-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
