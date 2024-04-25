import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { randomBytes } from "crypto";
import { resolve } from "path";
import { useSelector } from "react-redux";
import { RootState } from "./Store";

const initialState = {
    values: 0,
    city: ''
}

export const counterSlice = createSlice({
    name: 'counter',
    // initialState: {
    //     values: 0,
    //     city: 'hcm'
    // },
    initialState,
    reducers: {
        increment: state => {
            state.values += 1;
            state.city = 'bd'
        },
        decrement: state => {
            if (state.values != 0) {
                state.values -= 1;
                state.city = 'bp'
            }
        },
        changeCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(counterAsync.pending, () => {
            console.log('pending');
        }

        )
            .addCase(counterAsync.fulfilled, (state, action: any) => {
                // state.values+=action.payload;
                console.log(action.payload)
            })
    }
})

export const counterAsync = createAsyncThunk(
    'descript/APIfetch',
    ///function input data to fetch
    async (translateText: string, thunkAPI) => {
        try {

            //await new Promise((resolve)=>setTimeout(resolve,1000));
            const fetchData = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/vi/${translateText}`);
            return fetchData.json();
        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const { increment, decrement, changeCity } = counterSlice.actions;
export default counterSlice.reducer;