import PropTypes from "prop-types";

const PromptToLocation = (prompt) => {

  const url = "https://api.openai.com/v1/chat/completions"; // open ai API endpoint

  const data = {
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
    functions: [{
      name: "displayData",
      description: "Get the current weather data for the identified location",
      parameters: {
        type: "object",
        properties: {
          country: {
            type: "string",
            description: "The country name of the identified location",
          },
          country_code: {
            type: "string",
            description: "The country code of the identified location (ISO-3166)",
          },
          USstate: {
            type: "string",
            description: "The full state name of the identified location (if applicable)",
          },
          state: {
            type: "string",
            description: "Two letter state code",
          },
          city: {
            type: "string",
            description: "The city of the identified location",
          },
          unit: {
            type: "string",
            enum: ["metric", "imperial"],
            description: "The unit of measurement for the weather data (metric or imperial)",
          }
        },
        required: ["country", "country_code", "USstate", "state", "city", "unit"],
      }
    }],
    function_call: "auto"
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
      //parse response into json object
      if (data.choices && data.choices.length > 0) {
        const functionCall = data.choices[0].message.function_call;
        if (functionCall && functionCall.name === "displayData") {
          const args = JSON.parse(functionCall.arguments);
          console.log("Function call arguments:", args);
        
          const locationString = () => {
            if (args.USstate) {
              return `${args.city}, ${args.USstate}, ${args.country}`;
            }
            return `${args.city}, ${args.country}`;
          };
          console.log("Location String:", locationString());
          return {
            country: args.country,
            country_code: args.country_code,
            USstate: args.USstate,
            state: args.state,
            city: args.city,
            unit: args.unit,
          };
        } else {
          throw new Error("Function call not found or invalid.");
        }
      }
      throw new Error("No valid response from OpenAI API.");
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
