import axios from 'axios';

export async function getMainData() {
    const { data } = await axios.get('https://disease.sh/v3/covid-19/all')
    return data;
}
export async function getCountryData() {
    const { data } = await axios.get('https://disease.sh/v3/covid-19/countries')
    return data;
}