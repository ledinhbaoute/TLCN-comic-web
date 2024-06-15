import * as React from 'react'; 
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

import OptionStatistic from './option-statistic';
import MonthYearPicker from './month-year-picker';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({ title, subheader, chart,onPickerChange,onOptionChange,option, ...other }) {
  const { labels, colors, series, options } = chart;

  
 
  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'text',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} registers`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
    
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <CardHeader 
          title={title} 
          subheader={subheader} 
          sx={{ padding: 0, '& .MuiCardHeader-content': { marginRight: 2 } }} 
        />
        <OptionStatistic onOptionChange={onOptionChange}/>
        <MonthYearPicker flag={option} onPickerChange={onPickerChange}/>
      </Box>
      
      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  onPickerChange:PropTypes.func,
  onOptionChange:PropTypes.func,
  option:PropTypes.string
};
