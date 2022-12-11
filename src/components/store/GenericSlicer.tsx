import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface GenreState {
    genres: any[]
    filterValues: (string | number)[]
}

const initialState: GenreState = {
    genres: [],
    filterValues: []
}

export const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        updateGenre: (state, action: PayloadAction<string[]>) => {
            state.genres = action.payload;
        },
        updateFilterValues: (state, action: PayloadAction<(string | number)[]>) => {
            state.filterValues = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {updateGenre, updateFilterValues} = genreSlice.actions

export default genreSlice.reducer
