import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceIcon from '@mui/icons-material/Place';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import './App.css'
import { BottomNavigation, Button, Chip, Paper, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    Width: 1500,
    fontSize: '1.5rem',
  },
});

function App() {
  const [searchText, setSearchText] = useState('mumbai')
  const [cityData, setCityData] = useState([])
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const API_KEY = '7294a3e2e59505a06d9d4bb7dc1c3e57';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const fatchAPI = async () => {
      const response = await fetch(url)
      const json = await response.json()
      setCityData(json)
      console.log('response', json);
    }
    fatchAPI();
  }, [searchText])

  return (
    <>
      <div className='mainBox' style={{ paddingTop: '1rem', color: 'floralwhite' }}>
        <div className='input' style={{ textAlign: 'center' }}>
          <input type="search" className="inputTagCSS" onChange={(e) => setSearchText(e.target.value)} />
        </div>

        {cityData.main !== undefined ?
          <div>
            <div>
              <div className='Icon_Name' style={{ textAlign: 'end' }}>
                <PlaceIcon style={{ color: 'red', fontSize: '5rem' }} />
                <h3 style={{ paddingRight: '0.8rem', margin: '0' }}>
                  {cityData.name}
                </h3>
                <h4 style={{ paddingRight: '0.8rem', margin: '0' }}>
                  {date.toLocaleString()}
                </h4>
              </div>
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, opacity: '0.5', height: '10rem' }} elevation={3}>
              <BottomNavigation
                style={{ justifyContent: 'space-between', height: '3rem', backgroundColor: '#F3FEE8' }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div style={{ paddingTop: '1rem' }}>
                    <Typography style={{ marginLeft: '1rem', fontSize: '5rem' }}>
                      {cityData.main.temp}°C
                      <CustomWidthTooltip title={cityData.weather[0].description} placement="top" arrow>

                        <Button>
                          <img src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`} alt="" />
                        </Button>
                      </CustomWidthTooltip>
                      |
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem' }}>
                      <Chip label="Minimum" style={{ background: 'black', fontSize: '1rem', color: 'white', width: '9rem' }} />
                      <Typography style={{ fontSize: '5rem' }}>
                        {cityData.main.temp_min}°C
                      </Typography>
                    </div>
                    <div
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginLeft: '2rem', paddingTop: '1rem' }}>
                      <Chip label="Maximum" style={{ background: 'black', fontSize: '1rem', color: 'white', width: '9rem' }} />
                      <Typography style={{ fontSize: '5rem' }}>
                        {cityData.main.temp_max}°C
                      </Typography>
                    </div>
                  </div>
                </div>
              </BottomNavigation>
            </Paper>
          </div>
          : <h2 style={{ textAlign: 'center' }}>There is No Data</h2>}
      </div>
    </>
  );
}

export default App;