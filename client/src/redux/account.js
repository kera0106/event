import * as ActionTypes from "./ActionTypes"

export const AccountData = (state = {
    isLoading: true,
    errMess: null,
    data:{}
    }, action) => {
    switch (action.type){
        case ActionTypes.ADD_ACCOUNT_DATA:
            return {...state, errMess: null, isLoading: false, data: action.payload};

        case ActionTypes.ACCOUNT_DATA_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ACCOUNT_DATA_LOADING:
            return {...state, isLoading: true, errMess: null, data: {}}

        default:
            return state
    }
}