import React, { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDate, setWeatherDate] = useState("");
  const apiKey = "6c119f9082364891872a340604a40cf5";
  const city = props.city;
  const apiUrl = `http://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${city}`;
  console.log(props.city);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data.data[0]);
        console.log("Current Weather Data:", data.data[0]);
        const date = new Date(weatherData.datetime.slice(0, -3));
        const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
          date
        );
        const day = date.getDate();
        setWeatherDate(`${month}-${day}`);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  return (
    <div className="h-80 mt-2 mb-5 w-full bg-white shadow-md rounded-2xl">
      <h2 className="text-start ps-6 pt-2 size-5 font-bold text-gray-500 text-2xl">
        Weather
      </h2>
      {weatherData && (
        <div className="flex items-center justify-evenly h-80">
          <div className="flex items-center justify-evenly">
            <div className="flex-col">
              <img
                className="h-48"
                src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`}
                alt="Weather Icon"
              />
              <h1 className="text-5xl font-semibold text-gray-500 mb-10 mt-2">
                {weatherData.temp}&#176;C
              </h1>
            </div>
          </div>
          <div className="text-gray-700 text-center">
            <h1 className="text-3xl font-semibold ">
              {weatherData.weather.description}
            </h1>
            <br />
            <h1 className="text-xl font-sans font-medium">
              Today , {weatherDate}
            </h1>
            <br />
            <h1 className="text-xl font-medium font-sans justify-center flex items-center">
              <IoLocationOutline className="mr-2" />
              {weatherData.city_name} ,{weatherData.country_code}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
