import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMovieCastApi, fetchMovieDetailsApi} from "@/data/api/api";

const FetchMovieDetailsAction = createAsyncThunk(
    "movies/fetchMovieDetails",
    async (id: number, {rejectWithValue}) => {
        try {
            const movieDetails = fetchMovieDetailsApi(id)
            const castMembers = fetchMovieCastApi(id);
            return {
                res: await movieDetails,
                re: await castMembers
            };
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Failed to fetch movie details in action";
            return rejectWithValue(errorMsg);
        }
    }
)

export default FetchMovieDetailsAction;