// Import
import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

function App() {
  // Set states for search and result. prevHistory to save all searches
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [prevHistory, setPrevHistory] = useState([]);

  // Set Event handler to get users' search
  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  // API KEY for Open AI
  const APIKEY = process.env.REACT_APP_OPENAI_API_KEY;

  // Set Event Handler for submitting
  const handleSubmit = async (event) => {
    event.preventDefault();

    const configuration = new Configuration({
      apiKey: APIKEY,
    });
    
    const openai = new OpenAIApi(configuration);
    
    // Set try and catch for error handling
    try{
    const response = await openai.createCompletion("text-curie-001", {
        prompt: `${search}`,
        temperature: 0.99,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }, {
        timeout: 5000,
        headers: ""
      }
    );
      setResult(response.data.choices[0].text);
      setPrevHistory([...prevHistory, {prevSearch:search, prevResult: response.data.choices[0].text}])
      setSearch("");
  }catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  };
} 

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            id="search"
            value={search}
            type="text"
            onChange={(event) => handleChange(event)}
            placeholder={"What do you wanna ask?"}
          />
          <button>Submit</button>
        </form>
        <p>You asked: {prevHistory.length > 0 ? prevHistory[prevHistory.length-1].prevSearch : ""}</p>
        <p>response: {result}</p>
        {/* <div>
          {prevHistory && prevHistory.map((each,i) => {

            return (
              <div key={i}>
                <h1>{each.prevSearch}</h1>
              <p>{each.prevResult}</p>
              </div>
            )
          })}
        </div> */}
      </div>
  );
}

export default App;
