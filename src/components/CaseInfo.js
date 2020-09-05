import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import numeral from 'numeral'

import { Container, Emphasis } from '../styles/ui'

const InfoContainers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const InfoContainerItem = styled(Container)`
  width: calc(100% / 3);
`;

function CaseInfo({
  totalCases,
  totalDeaths,
  totalRecovered,
  newCases,
  newDeaths,
  newRecoveries,
  setType
}) {
  return (
    <InfoContainers>
        <InfoContainerItem onClick={() => setType('cases')}>
          <h1>Cases</h1>
          <div>+ <Emphasis>{numeral(newCases).format('0,0')}</Emphasis> today</div>
          <small><Emphasis>{numeral(totalCases).format(0,0)}</Emphasis> total</small>
        </InfoContainerItem>

        <InfoContainerItem onClick={() => setType('recovered')}>
          <h1>Recoveries</h1>
          <div>+ <Emphasis>{numeral(newRecoveries).format('0,0')}</Emphasis> today</div>
          <small><Emphasis>{numeral(totalRecovered).format('0,0')}</Emphasis> total</small>
        </InfoContainerItem>

        <InfoContainerItem onClick={() => setType('deaths')}>
          <h1>Deaths</h1>
          <div>+ <Emphasis>{numeral(newDeaths).format('0,0')}</Emphasis> today</div>
          <small><Emphasis>{numeral(totalDeaths).format('0,0')}</Emphasis> total</small>
        </InfoContainerItem>
    </InfoContainers>
  )
}

CaseInfo.propTypes = {
  totalCases: PropTypes.number.isRequired,
  totalDeaths: PropTypes.number.isRequired,
  totalRecovered: PropTypes.number.isRequired,
  newCases: PropTypes.number.isRequired,
  newDeaths: PropTypes.number.isRequired,
  newRecoveries: PropTypes.number.isRequired,
  setType: PropTypes.func.isRequired
}

export default CaseInfo
