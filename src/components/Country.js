import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import styled from 'styled-components'
import { Container, List, Item, Emphasis } from '../styles/ui'

const CountryInformationContainer = styled.div`
  width: 40%;
`;
const StyledContainer = styled(Container)`
  max-height: calc(500px + 40px + .6em + 2em + 6.4px);
  overflow-y: scroll;
`;

function CountryInformation({
    countryData,
    setSelectedCountry
}) {
    return (
        <CountryInformationContainer>
          <StyledContainer>
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
                      <small><Emphasis>{numeral(cases).format('0,0')}</Emphasis> cases</small>
                    </Item>
                  );
              }) : null}
            </List>
          </StyledContainer>
        </CountryInformationContainer>
    )
}

CountryInformation.propTypes = {
    countryData: PropTypes.array.isRequired,
    setSelectedCountry: PropTypes.func.isRequired
}

export default CountryInformation
