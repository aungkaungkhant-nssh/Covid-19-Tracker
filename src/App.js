import logo from './logo.svg';
import './App.css';
import { CardContent, FormControl, MenuItem,Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import Table from './components/Table'
function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("worldwide");
  const [countryInfo,setCountryInfo]=useState({});
  const [tabledata,setTableData]=useState([]);
  const getCountries=async()=>{
      fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
          const countries=data.map((country)=>{
              return {name:country.country,value:country.countryInfo.iso2};
          })
          setCountries(countries);
          setTableData(data);
      })
      .catch((error)=>console.log(error))
  }
  const countryChange=async(event)=>{
     const countryCode=event.target.value;
     const url=countryCode==="worldwide"
              ? "https://disease.sh/v3/covid-19/all"
              : `https://disease.sh/v3/covid-19/countries/${countryCode}`
      fetch(url)
      .then((response)=>response.json())
      .then((data)=>{
         setCountryInfo(data);
         setCountry(countryCode)
      });
  }
  useEffect(()=>{
      getCountries()
  },[])
  useEffect(()=>{
      fetch("https://disease.sh/v3/covid-19/all")
      .then((response)=>response.json())
      .then((data)=>setCountryInfo(data))
  },[])
  return (
    <div className="app">
        <div className="app_left">
            <div className="app_header">
                <h1>Covid-19 TRACKER</h1>
                <FormControl className="app_dropdown">
                    <Select variant="outlined" onChange={countryChange} value={country}>
                        <MenuItem value="worldwide">World Wide</MenuItem>
                        {
                          countries.map((country,index)=>{
                            return <MenuItem value={country.value} key={index}>{country.name}</MenuItem>
                          })
                        }
                    </Select>
                </FormControl>
              </div>
              <div className="app_stats">
                    <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}></InfoBox>
                    <InfoBox title="Recovered" cases={countryInfo.todayRecovered}
                    total={countryInfo.recovered}
                    ></InfoBox>
                    <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
              </div>
        </div>
        <div className="app_right">
            <CardContent>
                <div className="app_information">
                      <h3>Live Cases By Countries</h3>
                      <Table countries={tabledata}/>
                </div>
            </CardContent>
        </div>
    </div>
  );
}

export default App;
