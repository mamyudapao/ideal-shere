import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/rest-auth/registration/'
})

export default instance;