import {createSlice} from "@reduxjs/toolkit";
import fetchMoviesAction from "@/state/actions/FetchMoviesAction";
import fetchTrendingMoviesAction from "@/state/actions/FetchTrendingMoviesAction";

interface Props {
    movies: Movie[],
    loading: boolean,
    error: string | null,
}

const initialState: Props = {
    movies: [],
    loading: false,
    error: null,
}

const movieSlice = createSlice(
    {
        name: 'movie',
        initialState: initialState,
        reducers: {
            addMovie: (state, action) => {
                state.movies.push(action.payload);
            }
        },
        extraReducers: builder => {
            builder
                .addCase(fetchMoviesAction.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchMoviesAction.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                })
                .addCase(fetchMoviesAction.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.movies = action.payload as Movie[];
                })

                // trending actions
                .addCase(fetchTrendingMoviesAction.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchTrendingMoviesAction.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                })
                .addCase(fetchTrendingMoviesAction.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.movies = action.payload as Movie[];
                })
        }
    }
)

export default movieSlice.reducer;