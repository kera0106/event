import * as ActionTypes from "./ActionTypes";

export const Invitations = (state = {
    isLoading: true,
    errMess: null,
    data:{}
}, action) => {
    switch (action.type){
        case ActionTypes.ADD_INVITATIONS:
            return {...state, errMess: null, isLoading: false, data: action.payload};

        case ActionTypes.INVITATIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.INVITATIONS_LOADING:
            return {...state, isLoading: true, errMess: null, data: {}}

        default:
            return state
    }
}