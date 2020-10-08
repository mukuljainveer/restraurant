import {combineReducers, createStore} from "redux";
import Restaurant from "./reducers/Restaurant";

const reducers=combineReducers({
    Restaurant:Restaurant
})

const store=createStore(reducers);

export default store;