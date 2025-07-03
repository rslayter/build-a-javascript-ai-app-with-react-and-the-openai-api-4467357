import PropTypes from "prop-types";

const Description = ({ description }) => {
  return (
    <div className="weather-description">
      {description ? description : ""}
    </div>
  );
};

Description.defaultProps = {
  description: "Waiting for weather data...",
};

Description.propTypes = {
  description: PropTypes.string
};

export default Description;
