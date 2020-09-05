import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { Map, TileLayer, Popup, Circle } from 'react-leaflet';
import { Container } from '../styles/ui'

const MapArea = styled.div`
  width: 60%;
  margin-right: 1em;
`;
const MapContainer = styled.div`
  height: 500px;
  width: 100%;
`;

function MapComponent({
    position,
    zoom,
    countryData,
    type,
    caseTypes
}) {
    return (
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
    )
}

MapComponent.propTypes = {
    position: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
    countryData: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    caseTypes: PropTypes.object.isRequired
}

export default MapComponent
