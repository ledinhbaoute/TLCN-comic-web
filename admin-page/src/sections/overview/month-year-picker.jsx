import * as React from 'react';
import PropTypes from 'prop-types'; 

import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';




export default function MonthYearPicker({flag,onPickerChange}) {
  const [value, setValue] = React.useState(new Date());
  const views = flag === 'Theo nam' ? ['year'] : ['year', 'month'];

  const handleDateChange = (newValue) => {
    setValue(newValue);
    if (flag === 'Theo nam') {
      onPickerChange([null,newValue.getFullYear()]); // Trả về năm
    } else {
      const month = newValue.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
      const year = newValue.getFullYear();
      onPickerChange([month,year]); // Trả về tháng và năm
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={views}
        label={flag === 'Theo nam' ? 'Chọn năm' : 'Chọn tháng và năm'}
        minDate={new Date('2010-01-01')}
        maxDate={new Date('2026-12-12')}
        value={value}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
}
MonthYearPicker.propTypes = {
    flag: PropTypes.oneOf(['Theo nam', 'Theo thang']).isRequired,
    onPickerChange:PropTypes.func
  };
