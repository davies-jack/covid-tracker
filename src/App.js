import React, { useState, useEffect } from 'react';
import * as api from './api';
import styled from 'styled-components';
import './App.css';

import CountryInformation from './components/Country';
import MapComponent from './components/Map';

import { AppContainer, Header } from './styles/app'
import InfoContainer from './components/InfoContainer';

const TrackerInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2em;
`;

const caseTypes = {
  cases: {
    color: '#FACA15',
    size: 800,
  },
  recovered: {
    color: '#0E9F6E',
    size: 1200
  },
  deaths: {
    color: '#F05252',
    size: 2000
  }
};

function App() {
  const [trackerData, setTrackerData] = useState({});
  const [countryData, setCountryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [type, setType] = useState("cases");
  const [selectedCountry, setSelectedCountry] = useState(false);

  const [position, setPosition] = useState([0,0]);
  const [zoom, setZoom] = useState(2);

  function getAllData() {
    api.getMainData()
    .then((res) => setTrackerData(res))
    .catch(err => setError(err));
  }
  function getAllCountryData() {
    api.getCountryData()
    .then((res) => setCountryData(res))
    .catch(err => setError(err));
  }

  useEffect(() => {
    getAllData();
    getAllCountryData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCountry.lat && selectedCountry.long) {
      setZoom(8);
      setPosition([selectedCountry.lat, selectedCountry.long]);
    }
  }, [selectedCountry])
  
  if (isLoading || trackerData === {}) return <p>Loading . . .</p>;
  if (error) return <p>There has been an error</p>;

  return (
    <AppContainer>
      <Header>
        <h1>Covid Tracker</h1>
      </Header>

      <InfoContainer
        totalCases={selectedCountry.cases !== undefined ?  selectedCountry.cases : trackerData.cases}
        totalDeaths={selectedCountry.deaths !== undefined ? selectedCountry.deaths : trackerData.deaths}
        totalRecovered={selectedCountry.recovered !== undefined ? selectedCountry.recovered : trackerData.recovered}

        newCases={selectedCountry.todayCases !== undefined ?  selectedCountry.todayCases : trackerData.todayCases}
        newDeaths={selectedCountry.todayDeaths !== undefined ?  selectedCountry.todayDeaths : trackerData.todayDeaths}
        newRecoveries={selectedCountry.todayRecovered !== undefined ?  selectedCountry.todayRecovered : trackerData.todayRecovered}

        setType={setType}
      />

      <TrackerInfo>
        <MapComponent position={position} zoom={zoom} countryData={countryData} type={type} caseTypes={caseTypes} />
        <CountryInformation countryData={countryData} setSelectedCountry={setSelectedCountry} />
      </TrackerInfo>
    </AppContainer>
  );
}

export default App;
