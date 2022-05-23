// Import React
import { useState } from "react";

// Import MUI
import FormControl from "@mui/material/FormControl";
import {TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import SelectTone from "../utilities/SelectTone";
// Import OpenAI
const { Configuration, OpenAIApi } = require("openai");

export default function Landing () {

  // Set states for search and result. prevHistory to save all searches
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [prevHistory, setPrevHistory] = useState([]);

  // Set states for hovering effect for the submit button
  const [isHovering, setIsHovering] = useState(false);
  
  // Set states for loading animation
  const [isLoading, setIsLoading] = useState(false);

  // Set states for Open AI's temperature, deciding randomness of answers
  const [tone, setTone] = useState(0)

  // Set Event handler to get users' search
  const handleChange = (event) => {
    setSearch(event.target.value);
    setIsLoading(true);
  }

  // Set Event handler for the hover effect for the submit button
  const handleMouseOver = () => {
    setIsHovering(!isHovering);
  }
 
  // Set Event handler to change Open AI's temperature
 const handleTone = (event) => {
    setTone(Number(event.target.value));
  };

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
        temperature: tone,
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
      setPrevHistory([...prevHistory, {prevSearch:search, prevResult: response.data.choices[0].text}]);
      setSearch("");
      setIsLoading(false);
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
      <section>
            <FormControl required>
            <Box sx={{display:"flex", alignItems:"center"}}>
            <TextField  
                InputLabelProps={{style: {color: "#638494", backgroundColor:"transparent"}}}
                sx={{width:'40ch', backgroundColor:"#CDD8DD "}} 
                id="search" 
                label="what do you have in mind?" 
                value={search}
                multiline minRows={10} 
                maxRows={10} 
                variant="filled"
                onChange={(event) => handleChange(event)}
            />
            </Box>
            <Box  >
            <button 
              onClick={handleSubmit} 
              onMouseEnter={handleMouseOver}
              onMouseLeave={handleMouseOver}
              style={{
                marginTop:"5px",
                color: isHovering ? "yellow" : "white", 
                backgroundColor: isHovering ? "#4073C2" : "#DA0000",
                height:"5ch", 
                width:"12ch",
                float:"right",
                fontWeight: "bold",
                border:"#920404",
                }}
                >
                Submit
            </button>
            </Box>
            <Typography 
            sx={{
              color:"yellow",
              fontFamily: "sans-serif",
              fontSize: 20,
              letterSpacing: 1,
              fontWeight: "bold",
              }}
              >
                Our conversation
              </Typography>
              <SelectTone setTone={setTone} tone={tone} handleTone={handleTone}/>
            {isLoading ? <LinearProgress color="secondary" /> : <Divider variant="full" sx={{backgroundColor:"white", height:"2px", mt:1, mb:1}} />}
            <Box sx={{width:"40ch"}}>   
          {prevHistory && prevHistory.map((each,i) => {
            return (
              <article key={i+"#saltingKey"}>
                  <Typography sx={{color:"white"}}>
                  <span style={{color:"#E7E172"}}>You asked:</span> {prevHistory[prevHistory.length-1-i].prevSearch}
                  </Typography>
                  <Typography sx={{color:"white"}}>
                    <span style={{color:"#4D4BB2"}}>My response:</span> {prevHistory[prevHistory.length-1-i].prevResult}
                  </Typography> 
                  <Divider variant="full" sx={{backgroundColor:"darkGrey", height:"2px", mt:1, mb:1}} />
                  </article>
            )
          })}
            </Box>
            </FormControl>
           
      </section>
    )
}