import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import App from '../App'

const API_ALL_URL = 'https://disease.sh/v3/covid-19/all';

const server = setupServer(
    rest.get(API_ALL_URL, (req, res, ctx) => {
        return res(ctx.json({
            cases: 1337,
            deaths: 111,
            recovered: 1,
            todayCases: 1234,
            todayDeaths: 7,
            todayRecovered: 987,
        }));
    })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Page loads and outputs data from api', async () => {
    render(<App />);    

    const getTodayCases = await screen.findByTestId('new-cases');
    await waitFor(() => expect(getTodayCases).toHaveTextContent("+ 1,234 today"))
    
    const getTotalCases = screen.getByTestId('total-cases');
    expect(getTotalCases).toHaveTextContent("1,337 total");
   
    const getTodayRecoveries = screen.getByTestId('new-recoveries');
    expect(getTodayRecoveries).toHaveTextContent('+ 987 today');

    const getTotalRecoveries = screen.getByTestId('total-recoveries');
    expect(getTotalRecoveries).toHaveTextContent('1 total');

    const getNewDeaths = screen.getByTestId('new-deaths');
    expect(getNewDeaths).toHaveTextContent('+ 7 today');

    const getTotalDeaths = screen.getByTestId('total-deaths');
    expect(getTotalDeaths).toHaveTextContent('111 total');
});

test('On server error give error message', async () => {
    server.use(
        rest.get(API_ALL_URL, (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({ message: 'Internal Server Error' }),
          )
        }),
      )
    
    render(<App />);

    const getError = await screen.findByTestId('error');
    expect(getError).toHaveTextContent('There has been an error')
})