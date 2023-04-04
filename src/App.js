import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceIcon from '@mui/icons-material/Place';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('mumbai')
  const [cityData, setCityData] = useState([])
  const API_KEY = '7294a3e2e59505a06d9d4bb7dc1c3e57';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${API_KEY}&units=metric`;

  useEffect(()=>{
   const fatchAPI = async () =>{
    const response = await fetch(url)
    const json = await response.json()
    setCityData(json)
    console.log('response', json);
   }
   fatchAPI();
  },[searchText])

  return (
    <>

      <div className='mainBox' style={{ margin: '5rem'}}>
        <div className='input' style={{ textAlign: 'center' }}>
          <input type="search" className="inputTagCSS" onChange={(e) => setSearchText(e.target.value)} />
        </div>

        {cityData.main !== undefined ?
          <div>
            <div className='Icon_Name' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <PlaceIcon style={{ color: 'red' }} />
              <h3>
                {cityData.name}
              </h3>
            </div>
            <div className='Icon_Name' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DeviceThermostatIcon style={{ color: 'aqua' }} />
              <h3>
                {cityData.main !== undefined && cityData.main.temp}°C
              </h3>
            </div>
            <div className='Icon_Name' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DeviceThermostatIcon style={{ color: 'aqua' }} />
              <h4>
                Minimum : {cityData.main !== undefined && cityData.main.temp_max}°C I  Maximum : {cityData.main !== undefined && cityData.main.temp_min}°C
              </h4>
            </div>
          </div> : <h2 style={{textAlign:'center'}}>There is No Data</h2>
        }
      </div>
    </>
  );
}

export default App;