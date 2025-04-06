import {configureStore} from "@reduxjs/toolkit";
import movieSlice from "@/state/reducers/movieSlice";

export const movieStore = configureStore({
    reducer: {
        movie: movieSlice
    },
})

// Type the RootState for accessing the state throughout the app
export type RootState = ReturnType<typeof movieStore.getState>;

// Type the AppDispatch for dispatching actions
export type AppDispatch = typeof movieStore.dispatch;