import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GenreState {
    // genre: string
    genres: any[]
    filterValues: (string | number)[]
}

const initialState: GenreState = {
    // genre: "",
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
export const { updateGenre, updateFilterValues } = genreSlice.actions

export default genreSlice.reducer