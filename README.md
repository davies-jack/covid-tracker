# COVID-19 Tracker

![screenshot](https://i.imgur.com/JDwRPSQ.png)

## About

I decided to create this small COVID-19 tracker app as I wanted to create something that I can practice my skills with, and learn more about using maps (leaflet to be specific).

The external API I used for this project can be found at: [disease.sh](https://disease.sh/)

## Features

You can view cases, recoveries & deaths today globally or by country, and you are also able to visualize cases, recoveries & deaths globally or by country. 

##  Installation

- Firstly, clone this repository somewhere on your computer.
- With your command line, run `yarn install`.
- When everything has been installed, you can run `yarn start` to run the application.
- Go to `localhost:3000` on your browser to see the app!

## Packages

- React
- Styled Components, to style the app. (Version: ^5.2.0)
- Axios, to make HTTP requests. (Version: ^0.20.0)
- Leaflet, the map library. (Version: ^1.7.1)
- React-Leaflet, making leaflet easier to use in React. (Version: ^2.7.0)
- Numeral, for formatting numbers. (Version: ^2.0.6)

## Next Steps

- Centralising all margins & re-used colours into the `theming/index.js` file
- A search function allowing you to search for a country
- More information about cases etc