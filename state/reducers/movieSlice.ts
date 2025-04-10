import {createSlice} from "@reduxjs/toolkit";
import fetchMoviesAction from "@/state/actions/FetchMoviesAction";
import fetchTrendingMoviesAction from "@/state/actions/FetchTrendingMoviesAction";
import searchMovieAction from "@/state/actions/SearchMovieAction";
import FetchMostSearchedMoviesAction from "@/state/actions/FetchMostSearchedMovies";

interface Props {
    movies: Movie[],
    trendingMovies: Movie[],
    searchedMovies: Movie[],
    mostSearchedMovies: MovieSearch[],
    noSearchResults: boolean,
    loading: boolean,
    error: string | null,
}

const initialState: Props = {
    movies: [],
    trendingMovies: [],
    searchedMovies: [],
    mostSearchedMovies: [],
    noSearchResults: false,
    loading: false,
    error: null,
}

const movieSlice = createSlice(
    {
        name: 'movie',
        initialState: initialState,
        reducers: {
            resetSearchedMovies: (state) => {
                state.searchedMovies = [];
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
                    state.trendingMovies = action.payload as Movie[];
                })

                // search movie action
                .addCase(searchMovieAction.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(searchMovieAction.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                })
                .addCase(searchMovieAction.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.searchedMovies = action.payload as Movie[];
                    state.noSearchResults = (action.payload as Movie[]).length === 0;
                })

                // most searched movies
                .addCase(FetchMostSearchedMoviesAction.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(FetchMostSearchedMoviesAction.rejected, (state, action) => {
                    state.loading = false;
                    state.mostSearchedMovies = [];
                    state.error = action.payload as string;
                })
                .addCase(FetchMostSearchedMoviesAction.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.mostSearchedMovies = action.payload as MovieSearch[];
                })
        }
    }
)

export const {resetSearchedMovies} = movieSlice.actions;
export default movieSlice.reducer;