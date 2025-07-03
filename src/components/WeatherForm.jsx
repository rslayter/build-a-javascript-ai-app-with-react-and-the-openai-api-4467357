import { useState } from "react";
import PropTypes from "prop-types";
import "./WeatherForm.css";

function WeatherForm({ onSubmit }) {
  const [inputLocation, setInputLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputLocation);
  };

  return (
    <form className="locationform" onSubmit={handleSubmit}>
      <div className="locationform__elements">
        <label htmlFor="location">Ask a weather-related question or enter a location</label>
        <input
          id="location"
          type="text"
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
          placeholder="Should I wear a coat in Oskaloosa, IA?"
        />
        <input type="submit" value="Submit" />
      </div>
      <p className="instructions">
        Ask a weather-related question or enter a location. For example, "What is the weather in New York City?" or "Should I wear a coat in Oskaloosa, IA?".
      </p>
    </form>
  );
}

WeatherForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default WeatherForm;
