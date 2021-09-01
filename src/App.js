import logo from './logo.svg';
import './App.css';
import { FormControl, MenuItem,Select } from '@material-ui/core';
import { useEffect, useState } from 'react';

function App() {
  const [countries,setCountries]=useState([]);
  const getCountries=async()=>{
      fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
          const countries=data.map((country)=>{
              return {name:country.country,value:country.countryInfo.iso2};
          })
          setCountries(countries)
      })
      .catch((error)=>console.log(error))
  }
  useEffect(()=>{
      getCountries()
  },[])
  return (
    <div className="app">
        <div className="app_left">
            <div className="app_header">
                <h1>Covid-19 TRACKER</h1>
                <FormControl className="app_dropdown">
                    <Select variant="outlined">
                        <MenuItem value="worldwide">World Wide</MenuItem>
                        {
                          countries.map((country,index)=>{
                            return <MenuItem value={country.iso2} key={index}>{country.name}</MenuItem>
                          })
                        }
                    </Select>
                </FormControl>
              </div>
        </div>
        <div className="app_right">
          Covid 19 lists
        </div>
    </div>
  );
}

export default App;
