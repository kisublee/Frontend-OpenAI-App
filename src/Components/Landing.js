// Import React
import { useState } from "react";

// Import MUI
import FormControl from "@mui/material/FormControl";
import {TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Divider from '@mui/material/Divider';

// Import OpenAI
const { Configuration, OpenAIApi } = require("openai");

export default function Landing () {

     // Set states for search and result. prevHistory to save all searches
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [prevHistory, setPrevHistory] = useState([]);

  // Set Event handler to get users' search
  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleMouseOver = () => {
    setIsHovering(!isHovering);
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
                border:"#920404 "
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
              fontWeight: "bold"
              }}
              >
                Our conversation
              </Typography>
            <Divider variant="full" sx={{backgroundColor:"white", height:"2px", mt:1, mb:1}} />
            <Box sx={{width:"40ch"}}>
              <Typography sx={{color:"white"}}>
                You asked: {prevHistory.length > 0 ? prevHistory[prevHistory.length-1].prevSearch : ""}
              </Typography>
              <Typography sx={{color:"white"}}>
                My response: {result}
              </Typography>
                {/* <div>
       {prevHistory && prevHistory.map((each,i) => {

         return (
           <div key={i}>
             <p style={{color:"white"}}>{each.prevSearch}</p>
           <p style={{color:"white"}}>{each.prevResult}</p>
           </div>
         )
       })}
     </div> */}
            </Box>
            </FormControl>
           
      </section>
    )
}