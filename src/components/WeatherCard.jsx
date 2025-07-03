import PropTypes from "prop-types";
import "./WeatherCard.css";
import Loader from "./Loader";

// Translate temperature from Kelvin to Celsius or Fahrenheit.
// temp is in Kelvin by default, unit is either metric or imperial.
// returns an object with value and unit.
const tempTranslator = (temp, unit) => {
  if (unit === "metric") {
    return { value: temp - 273.15, unit: "°C" };
  } else if (unit === "imperial") {
    return { value: (temp - 273.15) * 1.8 + 32, unit: "°F" };
  } else {
    return { value: temp, unit: "K" };
  }
};


// Translate wind speed from meters per second to feet per second.
// Returns an object with value and unit.
const speedTranslator = (speed, units) => {
  if (units === "imperial") {
    return { value: speed * 3.281, unit: "ft/s" };
  }
  return { value: speed, unit: "m/s" };
};

const WeatherCard = ({
  isLoading,
  data,
  units,
  country,
  USstate,
  setUnits,
}) => {
  // Display state if country is US.
  const stateDisplay = () => {
    if (data.sys.country === "US") {
      return `, ${USstate}`;
    } else {
      return "";
    }
  };

  // Handle unit change.
  const handleUnitChange = () => {
    if (units === "metric") {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  };

  // Set wind direction.
  const windDirStyle = {
    transform: `rotate(${data.wind.deg + 90}deg)`,
  };

  return (
    <article className="weathercard">
      {isLoading && <Loader />}
      <div className="weathercard__data">
        <div className="weathercard__meta">
          <div className="weathercard__meta-location">{`${
            data.name
          }${stateDisplay()}, ${country}`}</div>
        </div>
        <div className="weathercard__temp">
          <span className="temp">
            {tempTranslator(data.main.temp, units).value.toFixed(1)}
          </span>
          <span className="tempunit">
            {tempTranslator(data.main.temp, units).unit}
          </span>
        </div>
        <div className="weathercard__wind">
          <div className="weathercard__wind-speed">
            <span className="speed">
              {speedTranslator(data.wind.speed, units).value.toFixed(1)}
            </span>
            <span className="windunit">
              {speedTranslator(data.wind.speed, units).unit}
            </span>
          </div>
          <div className="weathercard__wind-dir" style={windDirStyle}>
            <span className="screen-reader-text">${data.wind.deg}</span>
          </div>
        </div>
        <button id="units" onClick={handleUnitChange}>
          Change units
        </button>
      </div>
    </article>
  );
};

// default props
WeatherCard.defaultProps = {
  data: {
    name: "--",
    sys: {
      country: "--",
    },
    main: {
      temp: 273,
    },
    wind: {
      speed: 0,
      deg: 0,
    },
  },
  units: "metric",
  setUnits: () => {},
};

// props validation
WeatherCard.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    name: PropTypes.string,
    sys: PropTypes.shape({
      country: PropTypes.string,
    }),
    main: PropTypes.shape({
      temp: PropTypes.number,
    }),
    wind: PropTypes.shape({
      speed: PropTypes.number,
      deg: PropTypes.number,
    }),
  }),
  units: PropTypes.string,
  country: PropTypes.string,
  USstate: PropTypes.string,
  setUnits: PropTypes.func,
};

export default WeatherCard;
