import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {logger} from "redux-logger";
import {AccountData} from "./account";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            accountData: AccountData,
        }),
        applyMiddleware(thunk, logger)
    )
    return store
}