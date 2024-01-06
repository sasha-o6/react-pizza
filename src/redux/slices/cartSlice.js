import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalPrice: 0,
        totalLength: 0,
        items: []
    },
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id == action.payload.id)

            if (findItem) { findItem.count++ } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            };

            state.totalPrice =
                state.items.reduce((sum, obj) => ((obj.price * obj.count) + sum), 0)

            state.totalLength =
                state.items.reduce((sum, obj) => (obj.count + sum), 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id == action.payload)

            if (findItem) findItem.count--
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id != action.payload)
        },
        clearItems(state) {
            state.totalPrice = 0;
            state.totalLength = 0;
            state.items = [];
        }
    }
});

export const selectCart = (state) => state.cart;
export const selectCartById = (id) => state => state.cart.items.find(obj => obj.id == id)

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer