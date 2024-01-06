import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: "filters",
    initialState: {
        searchValue: '',
        categoryID: 0,
        currentPage: 1,
        sort: {
            name: "популярности",
            sortProperty: "rating",
            order: "desc"
        }
    },
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setCategoryID(state, action) {
            state.categoryID = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setCurentSelected: (state, action) => {
            state.sort = action.payload
        },
        setFilters: (state, action) => {
            state.categoryID = action.payload.params.categoryID;
            state.currentPage = action.payload.params.page;
            state.sort = action.payload.sort;
        }
    }
});

export const { setSearchValue, setCategoryID, setCurrentPage, setCurentSelected, setFilters } = filterSlice.actions

export default filterSlice.reducer