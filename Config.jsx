import axios from 'axios';

const baseAxios = axios.create({
    
    baseURL: "http://146.190.126.8:5000",
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  export default baseAxios;