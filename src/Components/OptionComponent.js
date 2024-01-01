import { Country, State, City } from "country-state-city";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Weather from "./Weather";
import History from "./History";
import { auth } from "../firebase.config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Authentication from "./Authentication";

const OptionComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  const signOut = () => {
    console.log("adad");
    try {
      auth.signOut();
      toast.success("Successfully signed out!");
      setUser(true);
    } catch (error) {
      console.error("Error signing out", error);
      toast.error("Error signing out. Please try again.");
    }
  };

  useEffect(() => {
    const countryData = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      displayValue: country.name,
    }));
    setCountryData(countryData);
    setSelectedState(null);
    setSelectedCity(null);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry).map((state) => ({
        value: state.isoCode,
        displayValue: state.name,
      }));
      setStateData(states);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState(selectedCountry, selectedState).map(
        (city) => ({
          value: city.isoCode,
          displayValue: city.name,
        })
      );
      setCityData(cities);
    }
  }, [selectedCountry, selectedState]);

  console.log("Selected Country:", selectedCountry);
  console.log("State Data:", selectedState);
  console.log("city", selectedCity);

  return user ? (
    <Authentication />
  ) : (
    <div className="px-6 py-2 justify-between bg-blue-100">
      <div className="w-full px-10 justify-end flex ">
        <button
          onClick={signOut}
          className="bg-blue-400 py-2 px-4 text-white  rounded-md"
        >
          Sign Out
        </button>
      </div>
      <div className="flex text-center py-3 rounded-2xl">
        <div className="bg-white w-full rounded-2xl py-4">
          <p className="text-blue-400 font-bold mb-1">All Countries</p>
          <Dropdown
            options={countryData}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
          />
        </div>
        <div className="bg-white w-full mx-8 rounded-2xl py-4">
          <>
            <p className="text-blue-400 font-bold mb-1">
              States of
              {selectedCountry &&
                " " + Country.getCountryByCode(selectedCountry).name}
            </p>

            <Dropdown
              options={stateData}
              onChange={(selectedOption) => setSelectedState(selectedOption)}
            ></Dropdown>
          </>
        </div>
        <div className="bg-white w-full rounded-2xl py-4">
          <>
            <p className="text-blue-400 font-bold mb-1">
              Cities of
              {selectedState &&
                " " +
                  State.getStateByCodeAndCountry(selectedState, selectedCountry)
                    ?.name}
            </p>

            <Dropdown
              options={cityData}
              onChange={(selectedOption) => setSelectedCity(selectedOption)}
            ></Dropdown>
          </>
        </div>
      </div>
      <Weather city={selectedCity} />
      <History city={selectedCity} />
    </div>
  );
};

export default OptionComponent;
