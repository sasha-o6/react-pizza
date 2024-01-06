import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (fetchHref, thunkApi) => {
        const { data } = await axios.get(fetchHref)
        console.log(thunkApi);

        return data;

        // thunkApi.rejectWithValue('error text')
        // thunkApi.fulfillWithValue(data) // analog return
    }
)

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState: {
        items: [],
        status: "loading" // loading | success | error
    },
    reducers: {
        setItems: (state, action) => state.items = action.payload,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = 'loading';
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = 'error';
            state.items = [];
        })

        // [fetchPizzas.pending]: state => {
        //     state.status = 'loading';
        //     state.items = [];
        // },
        // [fetchPizzas.fulfilled]: (state, action) => {
        //     state.items = action.payload;
        //     state.status = 'success';
        // },
        // [fetchPizzas.rejected]: (state, action) => {
        //     state.status = 'error';
        //     state.items = [];
        // },
    }
});

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer