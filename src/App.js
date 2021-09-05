import logo from './logo.svg';
import './App.css';
import { CardContent, FormControl, MenuItem,Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import Table from './components/Table'
import {sortData} from './util'
import LineGraph from './components/LineGraph'
import Map from './components/Map'
import "leaflet/dist/leaflet.css";
import numeral from 'numeral';

// import "leaflet/dist/leaflet.css";
function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("worldwide");
  const [mapCountries,setMapCountries]=useState([]);
  const [countryInfo,setCountryInfo]=useState({});
  const [tabledata,setTableData]=useState([]);
  const [casesType,setCasesType]=useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom,setMapZoom]=useState(3)
  const getCountries=async()=>{
      fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
          const countries=data.map((country)=>{
              return {name:country.country,value:country.countryInfo.iso2};
          })
          const sortedData=sortData(data)
          setCountries(countries);
          setMapCountries(data)
          setTableData(sortedData);
      })
      .catch((error)=>console.log(error))
  }
  const countryChange=async(event)=>{
     const countryCode=event.target.value;
     const url=countryCode==="worldwide"
              ? "https://disease.sh/v3/covid-19/all"
              : `https://disease.sh/v3/covid-19/countries/${countryCode}`
      await fetch(url)
      .then((response)=>response.json())
      .then((data)=>{
         setCountryInfo(data);
         setCountry(countryCode);
         setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
         setMapZoom(9);
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
                    <InfoBox title="Coronavirus Cases" 
                    active={casesType==="cases"}
                    isRed
                    onClick={(e)=>setCasesType("cases")}
                    cases={`+${numeral(countryInfo.todayCases).format('0.0a')}`} 
                    total={`+${numeral(countryInfo.cases).format('0.0a')}`} >
                    </InfoBox>
                    <InfoBox title="Recovered" 
                    active={casesType==="recovered"}
                    isGreen
                     onClick={(e)=>setCasesType("recovered")}
                    cases={`+${numeral(countryInfo.todayRecovered).format('0.0a')}`}
                    total={`+${numeral(countryInfo.recovered).format('0.0a')}`}
                    ></InfoBox>
                    <InfoBox title="Deaths"
                    active={casesType==="deaths"} 
                    isRed
                    onClick={(e)=>setCasesType("deaths")}
                    cases={`+${numeral(countryInfo.todayDeaths).format('0.0a')}`} total={`+${numeral(countryInfo.deaths).format('0.0a')}`}></InfoBox>
              </div>

              <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />
        </div>
        <div className="app_right">
            <CardContent>
                <div className="app_information">
                      <h3>Live Cases By Countries</h3>
                      <Table countries={tabledata}/>
                      <h3>World News {casesType}</h3>
                      <LineGraph casesType={casesType}/>
                </div>
            </CardContent>
        </div>
    </div>
  );
}

export default App;
