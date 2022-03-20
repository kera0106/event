import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

const serverApi = {
    getAccount: (userId) => axios.get(`/account/${userId}`),
    editAccount: (id, profileData) => axios.put(`/editAccount/${id}`, profileData),
    getEvent: (eventId) => axios.get(`/event/${eventId}`),
    getConflictActivities: (accountId, activity) => axios.post(`/conflictActivities/${accountId}`, activity),
    getConflictActivitiesExceptEvent: (accountId, eventId, activity) => axios.post(`/conflictActivities/${accountId}/${eventId}`, activity),
    saveEvent: (accountId, data) => axios.post(`/addEventWithActivities/${accountId}`, data),
    getRole: (accountId, eventId) => axios.get(`/getRole/${accountId}/${eventId}`),
    editEvent: (accountId, eventId, data) => axios.put(`/editEvent/${accountId}/${eventId}`, data),
    editActivity: (accountId, eventId, activityId, data) => axios.put(`/editActivity/${accountId}/${eventId}/${activityId}`, data),
    deleteActivity: (accountId, eventId, activityId) => axios.delete(`/deleteActivity/${accountId}/${eventId}/${activityId}`),
    addActivities: (eventId, data) => axios.post(`/addActivity/${eventId}`, data),
    getInvitations: (accountId) => axios.get(`/invitedEvents/${accountId}`),
    confirmInvitation: (accountId, eventId) => axios.post(`/confirmInvitation/${accountId}/${eventId}`),
    deleteEvent: (accountId, eventId) => axios.delete(`/deleteEvent/${accountId}/${eventId}`)
};

export default serverApi;