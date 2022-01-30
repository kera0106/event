import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

const serverApi = {
    getAccount: (userId) => axios.get(`/account/${userId}`),
    editAccount: (id, profileData) => axios.put(`/editAccount/${id}`, profileData),
    getEvent: (eventId) => axios.get(`/event/${eventId}`),
    getConflictActivities: (accountId, activity) => axios.post(`/conflictActivities/${accountId}`, activity),
    saveEvent: (accountId, data) => axios.post(`/addEventWithActivities/${accountId}`, data),
};

export default serverApi;