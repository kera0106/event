import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {logger} from "redux-logger";
import {AccountData} from "./account";
import {createForms} from "react-redux-form";
import {SettingFormData} from "./settingForm";
import {EventData} from "./event";

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            accountData: AccountData,
            eventData: EventData,
            ...createForms({
                settingForm: SettingFormData
            })
        }),
        applyMiddleware(thunk, logger)
    )
}