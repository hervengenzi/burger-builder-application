import React from 'react';
import axios from 'axios';
const instances = axios.create({
    baseURL: 'https://burger-builder-1c037.firebaseio.com/',
});

export default instances;