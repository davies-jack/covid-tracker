import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Container, List, Item } from '../styles/ui'
const CountryInformationContainer = styled.div`
  width: 40%;
  max-height: 50vh;
  overflow-y: scroll;
`;

function CountryInformation({
    countryData,
    setSelectedCountry
}) {
    return (
        <CountryInformationContainer>
          <Container>
            <h1>Country Information</h1>
            <List>
              {countryData.length > 0 ? countryData.map(({
                country,
                cases,
                deaths,
                recovered,
                todayCases,
                todayDeaths,
                todayRecovered,
                countryInfo: {
                  lat,
                  long
                }}) => {
                  return (
                    <Item key={country} onClick={() => setSelectedCountry({ name: country, lat, long, cases,deaths,recovered,todayCases,todayDeaths,todayRecovered})}>
                      <span>{country}</span>
                      <small>{cases} cases</small>
                    </Item>
                  );
              }) : null}
            </List>
          </Container>
        </CountryInformationContainer>
    )
}

CountryInformation.propTypes = {
    countryData: PropTypes.array.isRequired,
    setSelectedCountry: PropTypes.func.isRequired
}

export default CountryInformation
