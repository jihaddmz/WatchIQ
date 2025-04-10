import {createAsyncThunk} from "@reduxjs/toolkit";
import {getMostSearchedMovies} from "@/data/api/appwrite";

const FetchMostSearchedMoviesAction = createAsyncThunk(
    "movies/fetchMostSearchedMovies",
    async (_, {rejectWithValue}) => {
        try {
            const result = await getMostSearchedMovies();
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Failed to fetch the most searched movies";
            return rejectWithValue(errorMsg);
        }
    }
)

export default FetchMostSearchedMoviesAction;