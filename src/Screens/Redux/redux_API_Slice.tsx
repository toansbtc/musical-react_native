import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { randomBytes } from "crypto";
import { resolve } from "path";
import { useSelector } from "react-redux";
import { RootState } from "./Store";
import { error } from "console";
import serverURL from "../../network/API_URL";

const initialState = {
    API_key: "",

}

export const APISlice = createSlice({
    name: 'API',
    // initialState: {
    //     values: 0,
    //     city: 'hcm'
    // },
    initialState,
    reducers: {
        increment: state => {

        },
        decrement: state => {

        },
        changeCity: (state, action: PayloadAction<string>) => {
            // state.city = action.payload;
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
            });

        builder
            .addCase(getKEY_From_Server.pending, () => console.log("ready get key from server"))
            .addCase(getKEY_From_Server.fulfilled, (state, action) => {
                state.API_key = action.payload;
                console.log(action.payload);
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
            thunkAPI.rejectWithValue(error);
        }
    }
)

export const getKEY_From_Server = createAsyncThunk(
    'express/APIKEY',
    async () => {
        try {
            const fetchData = await fetch(`${serverURL()}/Youtube/get_KEY`);
            if (fetchData.ok && fetchData.status == 200) {
                const dta = await fetchData.json()
                return dta.dataKEY
            }
        }
        catch (error) {
            console.error(error)
        }
    }
)

export const { increment, decrement, changeCity } = APISlice.actions;
export default APISlice.reducer;