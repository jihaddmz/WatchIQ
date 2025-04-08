import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import SearchBar from "@/components/SearchBar";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/stores/store";
import SearchMovieAction from "@/state/actions/SearchMovieAction";
import ItemSearchMovie from "@/components/ItemSearchMovie";
import {resetMovies} from "@/state/reducers/movieSlice";
import {appRoute, setAppRoute} from "@/core/Helpers";
import {Link, useFocusEffect} from "expo-router";

const Search = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const {movies, loading, error} = useSelector((state: RootState) => state.movie);

    useFocusEffect(
        useCallback(
            () => {
                if (appRoute === "Trending" || appRoute === "Index") {
                    setText("");
                    dispatch(resetMovies());

                }

                setAppRoute("Search");

                return () => {
                }
            }, []
        )
    )

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (text)
                dispatch(SearchMovieAction(text));
            else
                dispatch(resetMovies())
        }, 700)

        return () => clearTimeout(timeout);
    }, [text])

    return (
        <View className="flex-1 bg-black pt-12 px-5">
            <Text className="text-white text-2xl font-bold mb-10">Search</Text>
            <SearchBar value={text} onChangeText={(text) => {
                setText(text);
            }}/>
            {text && <Text className="text-white mt-1"> Search Results for <Text
                className="text-primary text-lg font-bold">{text}</Text></Text>}

            {
                loading &&
                <View className="z-10 justify-center items-center absolute top-0 bottom-0 start-0 end-0 bg-black/60">
                    <ActivityIndicator className={"text-primary"} size="large"/>
                </View>
            }

            {
                error &&
                <View className="z-10 justify-center items-center absolute top-0 bottom-0 start-0 end-0">
                    <Text className="justify-center items-center flex-1 text-red-600">Error: {error}</Text>
                </View>
            }

            {
                movies.length === 0 &&
                <View className="z-10 justify-center items-center flex-1">
                    <Text
                        className="text-red-600">{text ? "No results found" : "Use the search bar to search for movies."}</Text>
                </View>
            }

            {movies.length > 0 &&
                <FlatList className="mt-10" showsVerticalScrollIndicator={false} contentContainerStyle={{
                    gap: 10
                }}
                          keyExtractor={item => item.id.toString()}
                          data={movies} renderItem={({item}) => {
                    return <Link href={`/movie/${item.id}`} asChild>
                        <TouchableOpacity>
                            <ItemSearchMovie {...item}/>
                        </TouchableOpacity>
                    </Link>
                }}/>
            }
        </View>
    )
}

export default Search;