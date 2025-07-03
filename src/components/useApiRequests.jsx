import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LocationToCoordinates from "./LocationToCoordinates";
import WeatherData from "./WeatherData";
import PromptToLocation from "./PromptToLocation";
import WeatherDescript from "./WeatherDescript";

const useApiRequests = (prompt) => {
  const [error, setError] = useState(null);
  const [promptData, setPromptData] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [weatherDescription, setWeatherDescription] = useState(null);
  const [weatherDescriptLoading, setWeatherDescriptLoading] = useState(false);

  // Fetch location and weather data from API.
  useEffect(() => {
    if (!prompt) return;
    setWeatherDescriptLoading(true);
    const fetchData = async () => {
      try {
        const promptDataRes = await PromptToLocation(prompt);
        setPromptData(promptDataRes);

        const locationDataRes = await LocationToCoordinates(promptDataRes.locationString);
        setLocationData(locationDataRes);

        const weatherDataRes = await WeatherData(locationDataRes);
        setWeatherData(weatherDataRes);

        // Call WeatherDescript at the end
        const descriptionRes = await WeatherDescript(prompt, weatherDataRes);
        setWeatherDescription(descriptionRes);
      } catch (error) {
        setError(error);
        setWeatherDescription(null);
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [prompt]);

  // Set weatherDescriptLoading to false when weatherDescription or error changes
  useEffect(() => {
    if (weatherDescription !== null || error) {
      setWeatherDescriptLoading(false);
    }
  }, [weatherDescription, error]);

  return { error, promptData, locationData, weatherData, weatherDescription, weatherDescriptLoading };
};

useApiRequests.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default useApiRequests;
