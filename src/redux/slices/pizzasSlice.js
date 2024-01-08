import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (fetchParams, thunkApi) => {
        // const { search, limit, page, category, sortBy, order } = fetchParams;
        const fetchHref = new URL('https://6555464d63cafc694fe79d8e.mockapi.io/items');

        // fetchHref.searchParams.append('search', search);
        // fetchHref.searchParams.append('limit', limit);
        // fetchHref.searchParams.append('page', page)
        // fetchHref.searchParams.append('category', category)
        // fetchHref.searchParams.append('sortBy', sortBy);
        // fetchHref.searchParams.append('order', order);

        Object.keys(fetchParams).forEach(key => {
            // console.log(key, fetchParams[key]);
            fetchHref.searchParams.append(key, fetchParams[key]);
        });

        const { data } = await axios.get(fetchHref)
        // console.log(thunkApi);

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