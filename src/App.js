import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';

import './App.css';

import { Container, List, Item } from './styles/ui'
import { AppContainer, Header } from './styles/app'
import InfoContainer from './components/InfoContainer';

const TrackerInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2em;
`;
const MapArea = styled.div`
  width: 60%;
  margin-right: 1em;
`;
const CountryInformation = styled.div`
  width: 40%;
  max-height: 50vh;
  overflow-y: scroll;
`;
const MapContainer = styled.div`
  height: 500px;
  width: 100%;
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
  const [countryData, setCountryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [type, setType] = useState("cases");
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const [position, setPosition] = useState([0,0]);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all')
    .then(({data: allData}) => {
      setTrackerData(allData);

      axios.get('https://disease.sh/v3/covid-19/countries')
      .then(({data: countryData}) => {
        setIsLoading(false);
        setCountryData(countryData);
      })
    })
    .catch(err => {
      setIsLoading(false);
      setError(err);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry.lat && selectedCountry.long) {
      setZoom(8);
      setPosition([selectedCountry.lat, selectedCountry.long]);
    }
  }, [selectedCountry])
  
  if (isLoading || trackerData === {}) return <p>Loading . . .</p>;
  console.log(trackerData);
  console.log(countryData);
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

        type={type}
        setType={setType}
      />

      <TrackerInfo>
        <MapArea>
          <Container>
            <h1>Map Information</h1>
            <MapContainer>
              <Map center={position} zoom={zoom}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />              
                  {countryData.length > 0 ? countryData.map(({country, cases, deaths, recovered, countryInfo: { lat, long }}) => {
                    // console.log(country);
                    return (<Circle center={[lat, long]} color={caseTypes[type].color} fillColor={caseTypes[type].color} fillOpacity={0.4} radius={
                      Math.sqrt(type === 'cases' ? cases : type === 'deaths' ? deaths : recovered) * caseTypes[type].size
                    }>
                    <Popup>
                      {country} - {cases} cases, {deaths} deaths, {recovered} recovered
                    </Popup>
                  </Circle>);
                  }) : null};
              </Map>
            </MapContainer>
          </Container>
        </MapArea>

        <CountryInformation>
          <Container>
            <h1>Country Information</h1>
            <List>
              {countryData.length > 0 ? countryData.map(({country,cases,deaths,recovered,todayCases,todayDeaths,todayRecovered,countryInfo:{lat,long}}) => {
                
                  return (
                    <Item onClick={() => setSelectedCountry({ name: country, lat, long, cases,deaths,recovered,todayCases,todayDeaths,todayRecovered})}>
                      <span>{country}</span>
                      <small>{cases} cases</small>
                    </Item>
                  );

              }) : null}
            </List>
          </Container>
        </CountryInformation>
      </TrackerInfo>
    </AppContainer>
  );
}

export default App;
