import * as React from 'react'; 
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Theo nam', 'Theo thang'];

export default function OptionStatistic({onOptionChange}) {
  const [value, setValue] = React.useState(options[0]);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          onOptionChange(newValue)
        }}
      
        id="controllable-states-demo"
        options={options}
        sx={{ width: 150,textSizeAdjust:1}}
        renderInput={(params) => (
            <TextField 
              {...params} 
              label="Thống kê theo" 
              InputProps={{ ...params.InputProps, sx: { fontSize: 12 } }} 
              InputLabelProps={{ sx: { fontSize: 12 } }} 
            />
          )}
      />
    </div>
  );
}
OptionStatistic.propTypes = {
    onOptionChange:PropTypes.func
  };