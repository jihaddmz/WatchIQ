import {createAsyncThunk} from "@reduxjs/toolkit";
import {SearchMovieApi} from "@/data/api/api";
import {updateSearchCount} from "@/data/api/appwrite";

const SearchMovieAction = createAsyncThunk(
    "movies/searchMovie",
    async (query: string, {rejectWithValue}) => {
        try {
            const result = await SearchMovieApi(query);
            if (result.length > 0)
                updateSearchCount(query, result[0])
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Failed to search movie in action";
            return rejectWithValue(errorMsg);
        }
    }
)

export default SearchMovieAction;