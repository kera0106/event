import * as ActionTypes from "./ActionTypes"
import serverApi from "./../api/serverApi";

export const getAccountData = () => (dispatch) => {

    dispatch(accountLoading())

    const userId = localStorage.getItem('userId')
    return serverApi.getAccount(userId).then(response => {
            if (response) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            if (error.response) {
                if (typeof error.response.data === 'object')
                    throw new Error("Неизвестная ошибка")
                throw new Error(error.response.data)
            }
            throw new Error(error.message);
        })
        .then(response => response.data)
        .then(data => dispatch(addAccountData(data)))
        .then(data => dispatch(setSettingForm(data)))
        .catch(error => dispatch(accountFailed((error.message))))
}

export const getInvitations = () => (dispatch) => {

    dispatch(invitationsLoading())

    const userId = localStorage.getItem('userId')
    return serverApi.getInvitations(userId).then(response => {
            if (response) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            if (error.response) {
                if (typeof error.response.data === 'object')
                    throw new Error("Неизвестная ошибка")
                throw new Error(error.response.data)
            }
            throw new Error(error.message);
        })
        .then(data => dispatch(addInvitations(data)))
        .catch(error => dispatch(invitationsFailed((error.message))))
}

export const invitationsLoading = () => ({
    type: ActionTypes.INVITATIONS_LOADING
});

export const invitationsFailed = (errmess) => ({
    type: ActionTypes.INVITATIONS_FAILED,
    payload: errmess
});

export const addInvitations = (data) => ({
    type: ActionTypes.ADD_INVITATIONS,
    payload: data
});

export const accountLoading = () => ({
    type: ActionTypes.ACCOUNT_DATA_LOADING
});

export const accountFailed = (errmess) => ({
    type: ActionTypes.ACCOUNT_DATA_FAILED,
    payload: errmess
});

export const addAccountData = (data) => ({
    type: ActionTypes.ADD_ACCOUNT_DATA,
    payload: data
});

export const setSettingForm = (data) => ({
    type: ActionTypes.SET_SETTING_FORM_DATA,
    payload: data.payload
});

export const getEventData = () => (dispatch) => {

    dispatch(eventLoading())

    const path = window.location.pathname
    const index = path.lastIndexOf('/')  + 1
    const eventId = path.slice(index, path.length)
    return serverApi.getEvent(eventId).then(response => {
            if (response) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            if (error.response) {
                if (typeof error.response.data === 'object')
                    throw new Error("Неизвестная ошибка")
                throw new Error(error.response.data)
            }
            throw new Error(error.message);
        })
        .then(response => response.data)
        .then(data => dispatch(addEventData(data)))
        .catch(error => dispatch(eventFailed((error.message))))
}

export const getRole = () => (dispatch) => {

    const userId = localStorage.getItem('userId')
    const path = window.location.pathname
    const index = path.lastIndexOf('/')  + 1
    const eventId = path.slice(index, path.length)
    return serverApi.getRole(userId, eventId).then(response => {
            if (response) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            if (error.response) {
                if (typeof error.response.data === 'object')
                    throw new Error("Неизвестная ошибка")
                throw new Error(error.response.data)
            }
            throw new Error(error.message);
        })
        .then(response => response.data)
        .then(data => dispatch(setRole(data)))

}

export const setRole = (data) => ({
    type: ActionTypes.SET_ROLE_IN_EVENT,
    payload: data
});

export const eventLoading = () => ({
    type: ActionTypes.EVENT_DATA_LOADING
});

export const eventFailed = (errmess) => ({
    type: ActionTypes.EVENT_DATA_FAILED,
    payload: errmess
});

export const addEventData = (data) => ({
    type: ActionTypes.ADD_EVENT_DATA,
    payload: data
});