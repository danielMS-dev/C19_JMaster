import { API_BASE } from '../config/config.js'

export const Api = {
    get: async (request) => {
        try {
            console.log(`${API_BASE}${request}`)
            const response = await fetch(`${API_BASE}${request}`, {
                method: "GET",
            });
           return response.json();
        } catch (err) {
            return console.log(err);
        }
    }
}

export const showSpinner = () =>(
    document.querySelector('#statusBusy').style.display = 'block'
)

export const hiddenSpinner = () =>(
    document.querySelector('#statusBusy').style.display = 'none'
)


