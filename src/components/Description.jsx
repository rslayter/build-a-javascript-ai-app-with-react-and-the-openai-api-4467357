import PropTypes from "prop-types";
import Loader from "./Loader";

const Description = ({ description, isLoading }) => {
  return (
    <div className="weather-description">
      {isLoading ? <Loader /> : (description ? description : "")}
    </div>
  );
};

Description.defaultProps = {
  description: "Waiting for weather data...",
};

Description.propTypes = {
  description: PropTypes.string,
  isLoading: PropTypes.bool
};

export default Description;
