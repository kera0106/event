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