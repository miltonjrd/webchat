import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        common: {
            Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        }
    }
})

export default request;