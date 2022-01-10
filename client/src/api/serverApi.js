import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

const serverApi = {
    getAccount: () => axios.get('/account/45'),
};

export default serverApi;