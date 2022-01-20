import * as ActionTypes from "./ActionTypes"

export const EventData = (state = {
    isLoading: true,
    errMess: null,
    data:{}
}, action) => {
    switch (action.type){
        case ActionTypes.ADD_EVENT_DATA:
            return {...state, errMess: null, isLoading: false, data: action.payload};

        case ActionTypes.EVENT_DATA_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.EVENT_DATA_LOADING:
            return {...state, isLoading: true, errMess: null, data: {}}

        default:
            return state
    }
}