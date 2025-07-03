import PropTypes from "prop-types";

const WeatherDescript = (prompt, weatherData) => {

  const url = "https://api.openai.com/v1/chat/completions"; // open ai API endpoint

  const data = {
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content:
          "In a conversational professional tone, answer the [Question] based on the [WeatherData]. Provide an opinion about what the weather feels like. Provide temperature in Celsius or Fahrenheit, whichever is more appropriate. Never display the temperature in Kelvin. Provided recommendation about how to prepare and what to wear. For example, bring an umbrella, wear a windbreaker, a warm jacket, etcetera.",
      },
      {
        role: "user",
        content: `Question: ${prompt}, WeatherData: ${JSON.stringify(weatherData)}`,
      },
    ],
  };


  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
    },
    body: JSON.stringify(data), // send the data as a JSON string
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from OpenAI API:", data);
      if (data.choices && data.choices.length > 0) {
        const message = data.choices[0].message;
        if (message && message.content) {
          return message.content;
        }
      }
      throw new Error("No valid description from OpenAI API.");
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject(
        "Unable to provide a weather description. Please try again."
      );
    });
};

WeatherDescript.propTypes = {
  prompt: PropTypes.string.isRequired,
  weatherData: PropTypes.object
};

export default WeatherDescript;
