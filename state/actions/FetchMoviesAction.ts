import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMoviesApi} from "@/data/api/api";

const fetchMoviesAction = createAsyncThunk(
    'movies/fetchMovies',
    async (_, {rejectWithValue}) => {
        try {
            const result = await fetchMoviesApi();
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : new Error("Manual error");
            return rejectWithValue(errorMsg);
        }
    }
)

export default fetchMoviesAction;