import {Client, Databases, ID, Query} from 'react-native-appwrite';

const client = new Client()
    .setProject('67f6a6c0002091795d00')
    .setPlatform('com.jihadmz.moviefinder');

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_DEFAULT_KEY!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_COLLECTION_SEARCH_KEY!;

const database = new Databases(client);

export const getMostSearchedMovies = async (): Promise<MovieSearch[]> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID!,
            [
                Query.orderDesc("count"),
                Query.limit(5)
            ])
        return result.documents as unknown as MovieSearch[];
    } catch (e) {
        console.log(`The error is ${e}`)
        throw e;
    }
}

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID!,
            [
                Query.equal('searchQuery', query),
            ])

        if (result.documents.length === 0) { // this search term is not searched before
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchQuery: query,
                id: movie.id,
                poster_path: movie.poster_path,
                title: movie.title,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                count: 1
            })
        } else { // this search term is before
            const document = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, {
                count: document.count + 1
            })
        }

    } catch (e) {
        console.log(`The error is ${e}`)
        // we don't want to this error to affect the searching movies action
    }
}
