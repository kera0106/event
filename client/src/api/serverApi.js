import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

const serverApi = {
    getAccount: (userId) => axios.get(`/account/${userId}`),
};

export default serverApi;