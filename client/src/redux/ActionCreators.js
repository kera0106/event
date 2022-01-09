import * as ActionTypes from "./ActionTypes"
import serverApi from "./../api/serverApi";

export const getAccountData = () => (dispatch) => {

    dispatch(accountLoading())

    return serverApi.getAccount().then(response => {
            if (response) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            throw new Error(error.message);
        })
        .then(response => response.data)
        .then(data => dispatch(addAccountData(data)))
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