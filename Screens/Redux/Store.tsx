import { configureStore } from "@reduxjs/toolkit";
import counterRedux from './redux_API_Slice'
import { useSelector } from "react-redux";
import playSoundRedux from "./redux_PlaySound_Slide";

const store = configureStore({
    reducer: {
        API: counterRedux,
        playSound: playSoundRedux
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;
export default store;