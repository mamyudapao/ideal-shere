import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://idealshere.com/api'
})

export default instance;
