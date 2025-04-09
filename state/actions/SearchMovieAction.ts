import {createAsyncThunk} from "@reduxjs/toolkit";
import {SearchMovieApi} from "@/data/api/api";

const SearchMovieAction = createAsyncThunk(
    "movies/searchMovie",
    async (query: string, {rejectWithValue}) => {
        try {
            const result = await SearchMovieApi(query);
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Failed to search movie in action";
            return rejectWithValue(errorMsg);
        }
    }
)

export default SearchMovieAction;