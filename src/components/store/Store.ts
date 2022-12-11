import { configureStore } from '@reduxjs/toolkit'
import genreSlicer from "./GenericSlicer";
import spinnerSlicer from "./GenericSlicer";
import filterSlicer from "./GenericSlicer";

export const store = configureStore({
    reducer: {
        genre: genreSlicer,
        spinner: spinnerSlicer,
        filterValues: filterSlicer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch