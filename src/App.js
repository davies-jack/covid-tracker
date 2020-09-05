import React from 'react';
import styled from 'styled-components';
import './App.css';

const Header = styled.div`
  padding: 2em 0;
  h1 {
    margin: 0;
  }
`;
const AppContainer = styled.div`
  max-width: 60vw;
  margin: 0 auto;
`;
const InfoContainers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)!important;
  padding: 1em;
  border-radius: 6px;

  &:nth-of-type(2) {
    margin: 0 1em;
  }
 
  h1 {
    margin: 0;
    text-align: left;
  }
`;
const InfoContainer = styled(Container)`
  width: calc(100% / 3);
`;
const InfoLabel = styled.div``;

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
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <h1>Covid Tracker</h1>
      </Header>

      <InfoContainers>
        <InfoContainer>
          <h1>Cases</h1>
          <InfoLabel>130,000</InfoLabel>
          <small>1,240,032 total</small>
        </InfoContainer>
        <InfoContainer>
          <h1>Recoveries</h1>
          <InfoLabel>20,000</InfoLabel>
          <small>240,032 total</small>
        </InfoContainer>
        <InfoContainer>
          <h1>Deaths</h1>
          <InfoLabel>130,000</InfoLabel>
          <small>1,240,032 total</small>
        </InfoContainer>
      </InfoContainers>

      <TrackerInfo>
        <MapArea>
          <Container>
            <h1>Map Information</h1>
            <p>lorem</p>
          </Container>
        </MapArea>

        <CountryInformation>
          <Container>
            <h1>Country Information</h1>
            <p>lorem</p>
          </Container>
        </CountryInformation>
      </TrackerInfo>
    </AppContainer>
  );
}

export default App;
