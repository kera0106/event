import * as ActionTypes from "./ActionTypes";

export const SettingFormData = (state = {
    login: '',
    firstname: '',
    lastname: '',
}, action) => {
    switch (action.type){
        case ActionTypes.SET_SETTING_FORM_DATA:
            return {...state, login: action.payload.login, firstname: action.payload.firstname, lastname: action.payload.lastname};

        default:
            return state
    }
}