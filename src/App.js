import { useEffect, useState } from 'react';
import './App.css'
import { Button, Chip, FormControlLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { API_KEY, url } from './apiHandler';

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    Width: 1500,
    fontSize: '1.5rem',
  },
});


function App() {
  const [searchText, setSearchText] = useState('Ahmedabad')
  const [cityData, setCityData] = useState([])
  const [value, setValue] = useState(false)

  //method for call API for weather
  useEffect(() => {
    const fatchAPI = async () => {
      const response = await fetch(url+searchText+"&appid="+API_KEY+"&units=metric")
      const json = await response.json()
      setCityData(json)
      console.log('response', json);
    }
    fatchAPI();
  }, [searchText])

  //method for get value for change Celsius -> Fahrenheit or Fahrenheit -> Celsius
  const getValue = () => {
    if (value === false) {
      setValue(true)
    } else {
      setValue(false)
    }
  }
  //method for change temp value Celsius -> Fahrenheit or Fahrenheit -> Celsius
  const getTempValue = (temp) => {
    if (value === true) {
      return ((temp * 9) / 5 + 32).toFixed(2);
    } else {
      return temp.toFixed(2);
    }
  }

  const getTime = (milliseconds) => {
    const dateFromString = milliseconds.toString() + "000"
    const dateObj = new Date(parseFloat(dateFromString));
    const localDate = dateObj.toLocaleString();
    return localDate;
  }


  const temp = cityData.main !== undefined && getTempValue(cityData.main.temp); // give temp value
  const tempMax = cityData.main !== undefined && getTempValue(cityData.main.temp_max); // give maximum temp value
  const tempMin = cityData.main !== undefined && getTempValue(cityData.main.temp_min); // give minimum temp value
  const humidity = cityData.main !== undefined && getTempValue(cityData.main.humidity); // give minimum Humidity value
  const name = cityData.main !== undefined && cityData.name; // give city name value
  const country = cityData.sys !== undefined && cityData.sys.country; // give city name value
  const icon = cityData.weather !== undefined && cityData.weather[0].icon; // give icon value
  const title = cityData.weather !== undefined && cityData.weather[0].main; // give tolltip value
  const degValue = value === true ? "°F" : "°C"; // give degree value


  return (
    <>
      <div className='mainBox' style={{ paddingTop: '1rem' }}>
        <div className='input' style={{ textAlign: 'center' }}>
          <input type="search" className="inputTagCSS" onChange={(e) => setSearchText(e.target.value)} />
        </div>
        {cityData.main !== undefined &&
          <div>
            <div style={{ position: 'absolute', right: '0' }}>
              <FormControlLabel
                control={
                  <Switch defaultChecked color="secondary" onClick={() => { getValue() }} />
                }
                label={value === true ? "Fahrenheit" : "Celsius"}
              />
            </div>
          </div>}
        {cityData.main !== undefined ?
          <>
            <Table style={{ marginTop: '3rem', textAlign: 'center' }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Chip label="Temperature" style={{ background: 'black', fontSize: '1rem', color: 'white', width: '9rem' }} />
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Chip label="Minimum" style={{ background: 'black', fontSize: '1rem', color: 'white', width: '9rem' }} />
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Chip label="Maximum" style={{ background: 'black', fontSize: '1rem', color: 'white', width: '9rem' }} />
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <CustomWidthTooltip title={title} placement="top" arrow>
                      <Button>
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" style={{ borderRadius: '50%', backgroundColor: 'aqua', height: '3rem' }} />
                      </Button>
                    </CustomWidthTooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Typography style={{ marginLeft: '1rem', fontSize: '3rem' }}>
                      {temp + degValue}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Typography style={{ fontSize: '3rem' }}>
                      {tempMin + degValue}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Typography style={{ fontSize: '3rem' }}>
                      {tempMax + degValue}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <h3 style={{ paddingRight: '0.8rem', margin: '0' }}>
                      {name},{country}
                    </h3>
                    <h4 style={{ paddingRight: '0.8rem', margin: '0' }}>
                      {getTime(cityData.dt)}
                    </h4>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table style={{ marginTop: '3rem', textAlign: 'center' }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <CustomWidthTooltip title={"Wind"} placement="top" arrow>
                      <Button>
                        <img src="https://cdn-icons-png.flaticon.com/512/4005/4005837.png" alt="" style={{ borderRadius: '20%', height: '3rem' }} />
                      </Button>
                    </CustomWidthTooltip>
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <CustomWidthTooltip title={"Humidity"} placement="top" arrow>
                      <Button>
                        <img src="https://cdn-icons-png.flaticon.com/512/9290/9290540.png" alt="" style={{ borderRadius: '20%', height: '3rem' }} />
                      </Button>
                    </CustomWidthTooltip>
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <CustomWidthTooltip title={"Sunrise Time"} placement="top" arrow>
                      <Button>
                        <img src="https://cdn-icons-png.flaticon.com/512/8098/8098355.png" alt="" style={{ borderRadius: '20%', height: '3rem' }} />
                      </Button>
                    </CustomWidthTooltip>
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <CustomWidthTooltip title={"Sunset Time"} placement="top" arrow>
                      <Button>
                        <img src="https://cdn-icons-png.flaticon.com/512/8098/8098358.png" alt="" style={{ borderRadius: '20%', height: '3rem' }} />
                      </Button>
                    </CustomWidthTooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Typography style={{ marginLeft: '1rem', fontSize: '2.1rem' }}>
                      {cityData.wind.speed} meter/sec
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Typography style={{ fontSize: '2.1rem' }}>
                      {humidity}%
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Typography style={{ fontSize: '2.1rem' }}>
                      {getTime(cityData.sys.sunrise)}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none', textAlign: 'center' }}>
                    <Typography style={{ fontSize: '2.1rem' }}>
                      {getTime(cityData.sys.sunset)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
          : <h2 style={{ textAlign: 'center' }}>There is No Data</h2>}
      </div>
    </>
  );
}

export default App;