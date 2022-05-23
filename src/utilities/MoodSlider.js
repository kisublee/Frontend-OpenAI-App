import * as React from 'react';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import {useState} from 'react'

function ValueLabelComponent(props) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  marginLeft: "1.3vh",
  height: 5,
  width:100,
  marginTop:12,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#4073C2',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    padding: 0,
    width: 12,
    height: 12,
    color:"white",
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'black',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

export default function MoodSlider() {

  const [moodValue, setMoodValue] =useState(0)

  const handleChange = (event) => {
    setMoodValue(event.target.value);
  }
  console.log(moodValue)
  return (
    <Box sx={{ width: 320}}>
      <PrettoSlider
        onChange={(event) => handleChange}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        min={0.1}
      />     
    </Box>
  );
}
