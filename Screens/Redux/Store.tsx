import { configureStore } from "@reduxjs/toolkit";
import counterRedux from './ReduxSlice'
import { useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        counter: counterRedux,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;
export default store;