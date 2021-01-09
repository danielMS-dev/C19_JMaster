import { API_BASE, API_COUNTRY } from '../config/config.js'

export const getCountries = () => {
    return fetch(`${API_COUNTRY}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};