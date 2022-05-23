import * as React from 'react';
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';

export default function SelectTone({handleTone}) {
  return (
    <Box sx={{ minWidth: 120}}>
        <NativeSelect
          onChange={(event)=> handleTone(event)}
          variant='standard'
          defaultValue={0}
          inputProps={{
            name: 'tone',
            id: 'tone',
          }}
          sx={{color:"white", border:"none !important", outline:"none !important"}}
        >
          <option disabled value={0}>Choose my tone</option>
          <option value={0.1}>General</option>
          <option value={0.99}>Specific</option>
        </NativeSelect>
    </Box>
  );
}

