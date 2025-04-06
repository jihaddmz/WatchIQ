import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMoviesApi, fetchTrendingMoviesApi} from "@/data/api/api";

const fetchTrendingMoviesAction = createAsyncThunk(
    'movies/fetchTrendingMovies',
    async (_, {rejectWithValue}) => {
        try {
            const result = fetchTrendingMoviesApi();
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : new Error(`Failed to fetch trending movies`);
             rejectWithValue(errorMsg);
        }
    }
)

export default fetchTrendingMoviesAction;