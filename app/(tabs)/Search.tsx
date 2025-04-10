import {ActivityIndicator, FlatList, Keyboard, Text, TouchableOpacity, View} from "react-native";
import SearchBar from "@/components/SearchBar";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/stores/store";
import SearchMovieAction from "@/state/actions/SearchMovieAction";
import ItemSearchMovie from "@/components/ItemSearchMovie";
import {resetMovies} from "@/state/reducers/movieSlice";
import {appRoute, setAppRoute} from "@/core/Helpers";
import {Link, useFocusEffect} from "expo-router";
import FetchMostSearchedMoviesAction from "@/state/actions/FetchMostSearchedMovies";

const Search = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const {
        movies,
        mostSearchedMovies,
        noSearchResults,
        loading,
        error
    } = useSelector((state: RootState) => state.movie);

    useFocusEffect(
        useCallback(
            () => {
                if (appRoute === "Trending" || appRoute === "Index") {
                    setText("");
                    dispatch(resetMovies());

                }

                setAppRoute("Search");

                console.log(`The size is ${mostSearchedMovies.length}`);
                if (mostSearchedMovies.length === 0)
                    dispatch(FetchMostSearchedMoviesAction());

                return () => {
                }
            }, [mostSearchedMovies]
        )
    )

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (text) {
                Keyboard.dismiss();
                setTimeout(() => {
                    dispatch(SearchMovieAction(text));
                }, 200)
            } else
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
                error != null &&
                <View className="z-11 justify-center items-center flex-1">
                    <Text className="text-red-600">Error: {error}</Text>
                </View>
            }

            {
                noSearchResults &&
                <View className="z-10 justify-center items-center flex-1">
                    <Text
                        className="text-red-600">No results found</Text>
                </View>
            }

            {/* Showing the most searched movies when there is no search results */}
            {movies.length > 0 ?
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
                }}/> : mostSearchedMovies.length > 0 && !loading && !text ?
                    <View className="mt-10 flex-1">
                        <Text className="text-primary font-bold text-2xl">Most Searched Movies</Text>
                        <FlatList className="mt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{
                            gap: 10
                        }}
                                  keyExtractor={item => item.id.toString()}
                                  data={mostSearchedMovies} renderItem={({item}) => {
                            return <Link href={`/movie/${item.id}`} asChild>
                                <TouchableOpacity>
                                    <ItemSearchMovie {...item}/>
                                </TouchableOpacity>
                            </Link>
                        }}/>
                    </View> : null
            }

            {
                loading &&
                <View className="z-20 justify-center items-center flex-1 bg-black/60">
                    <ActivityIndicator className={"text-primary"} size="large"/>
                </View>
            }
        </View>
    )
}

export default Search;