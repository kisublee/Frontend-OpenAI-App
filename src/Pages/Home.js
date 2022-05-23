import * as React from 'react';

// Import MUI
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

// Import components
import Landing from "../components/Landing";

export default function Home () {

    return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md"
         sx={{
              flexGrow: 1, mt: 10,
              display: "flex", 
              justifyContent:"center", 
              overflow:"scroll", 
              paddingBottom:7
              }}
              >
            <Box>
                <Typography component="div" 
                    sx={{
                        mb:1,
                        fontFamily: "sans-serif",
                        fontSize: 20,
                        color: "white",
                        letterSpacing: 1,
                        fontWeight: "bold"
                        }}
                        >
                    <span style={{color:"yellow"}}> Hello! </span>        
                    <br/>
                    Ask me anything
                </Typography>
             <Box >
                <Landing />
             </Box>
            </Box>
        </Container>
    </React.Fragment>
)
}