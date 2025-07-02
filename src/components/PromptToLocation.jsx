import PropTypes from "prop-types";

const PromptToLocation = (prompt) => {

  const url = "https://api.openai.com/v1/chat/completions"; // open ai API endpoint

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that identifies locations from user prompts.",
        },
        {
          role: "user",
          content: `Identify the location from this prompt: "${prompt}"`,
        },
      ],
    }),
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject(
        "Unable to identify a location from your question. Please try again."
      );
    });
};

PromptToLocation.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default PromptToLocation;
