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