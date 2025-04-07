import {createSlice} from "@reduxjs/toolkit";
import fetchMoviesAction from "@/state/actions/FetchMoviesAction";
import fetchTrendingMoviesAction from "@/state/actions/FetchTrendingMoviesAction";
import fetchMovieDetailsAction from "@/state/actions/FetchMovieDetailsAction";
import FetchMovieDetailsAction from "@/state/actions/FetchMovieDetailsAction";

interface Props {
    movieDetails: MovieDetails | null,
    castMembers: CastMember[] | null,
    loading: boolean,
    error: string | null,
}

const initialState: Props = {
    movieDetails: null,
    castMembers: null,
    loading: true,
    error: null,
}

const movieDetailsSlice = createSlice(
    {
        name: 'movieDetails',
        initialState: initialState,
        reducers: {
        },
        extraReducers: builder => {
            builder
            // movie details action
                .addCase(fetchMovieDetailsAction.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(FetchMovieDetailsAction.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                    state.movieDetails = null
                })
                .addCase(FetchMovieDetailsAction.fulfilled, (state, action) => {
                    state.loading = false;
                    state.error = null;
                    state.movieDetails = action.payload!.res as MovieDetails;
                    state.castMembers = action.payload!.re as CastMember[];
                })
        }
    }
)

export default movieDetailsSlice.reducer;