import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

const serverApi = {
    sign_in: (accountDto) => axios.post('/sign_up', accountDto),
};

export default serverApi;