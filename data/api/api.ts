const CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_TMDB_API!.toString(),
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_TMDB_API!}`
    }
};

export const fetchMoviesApi = async (): Promise<Movie[]> => {
    const response = await fetch(
        `${CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`,
        {headers: CONFIG.headers});

    if (!response.ok) {
        throw new Error(`Failed to fetch movies from api ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
}

export const fetchTrendingMoviesApi = async (): Promise<Movie[]> => {
    const response = await fetch(
        `${CONFIG.BASE_URL}/discover/movie?sort_by=vote_count.desc`,
        {headers: CONFIG.headers});

    if (!response.ok) {
        throw new Error(`Failed to fetch trending movies from api ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
}

export const fetchMovieDetailsApi = async (id: number): Promise<MovieDetails> => {
    const response = await fetch(
        `${CONFIG.BASE_URL}/movie/${id}`,
        {headers: CONFIG.headers});

    if (!response.ok) {
        throw new Error(`Failed to fetch movie details from api ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const fetchMovieCastApi = async (id: number): Promise<CastMember[]> => {
    const response = await fetch(`${CONFIG.BASE_URL}/movie/${id}/credits`, {headers: CONFIG.headers});

    if (!response.ok) {
        throw new Error(`Failed to fetch movie cast from api ${response.statusText}`);
    }

    const data = await response.json();
    return data.cast;
}

export const SearchMovieApi = async (query: string): Promise<Movie[]> => {
    const response = await fetch(
        `${CONFIG.BASE_URL}/search/movie?query=${query}`,
        {headers: CONFIG.headers});

    if (!response.ok) {
        throw new Error(`Failed to search movie from api ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
}