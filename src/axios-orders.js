import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-1c037.firebaseio.com'
});

export default instance;