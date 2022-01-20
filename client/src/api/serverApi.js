import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

const serverApi = {
    getAccount: (userId) => axios.get(`/account/${userId}`),
    editAccount: (id, profileData) => axios.put(`/editAccount/${id}`, profileData),
    getEvent: (eventId) => axios.get(`/event/${eventId}`)
};

export default serverApi;