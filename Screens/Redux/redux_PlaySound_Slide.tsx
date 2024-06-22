import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Sound from "react-native-sound";

const initialState = {
    path_Sound: "",
    time_Play: 0,
    // Duration: 0,
    // sound_Ref: null as unknown as Sound,
}

export const playSound = createSlice({
    name: "playSound",
    initialState,
    reducers: {
        savePathSong: (state, action: PayloadAction<string>) => {
            state.path_Sound = action.payload;
        },
        saveTime: (state, action: PayloadAction<number>) => {
            state.time_Play = action.payload;
            //state.Duration = action.payload[1];

        },
        // saveSound: (state, action: PayloadAction<Sound>) => {
        //     state.sound_Ref.release();
        //     state.sound_Ref = action.payload;
        // }

    }
})

export const { savePathSong, saveTime } = playSound.actions;
export default playSound.reducer;