import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/stores/store";
import {useCallback} from "react";
import fetchMoviesAction from "@/state/actions/FetchMoviesAction";
import ItemMovie from "@/components/itemMovie";
import {appRoute, setAppRoute} from "@/core/Helpers";
import {useFocusEffect} from "expo-router";
import {resetMovies} from "@/state/reducers/movieSlice";

export default function Index() {
    const dispatch = useDispatch<AppDispatch>();
    const {movies, loading, error} = useSelector((state: RootState) => state.movie);

    useFocusEffect(
        useCallback(() => {
            dispatch(resetMovies());
            setTimeout(() => {
                if (!appRoute || appRoute === 'Trending' || appRoute === 'Search') {
                    dispatch(fetchMoviesAction());
                }

                setAppRoute("Index");
            }, 100)

        }, [dispatch]))

    return (
        <View
            className="flex-1 bg-black"
        >
            <View className="pt-10 ps-5">
                <Text className="mb-5 text-white font-bold text-2xl">Movies</Text>
            </View>

            {loading && <View className="z-10 justify-center items-center absolute top-0 bottom-0 right-0 left-0">
                <ActivityIndicator size="large" color="white"/>
            </View>}

            {error && <View className="z-10 justify-center items-center absolute top-0 bottom-0 right-0 left-0">
                <Text className=" flex-1 text-red-600">Error: {error}</Text>
            </View>}

            <FlatList
                data={movies}
                renderItem={({item}) => {
                    return <ItemMovie {...item}/>
                }}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    gap: 10,
                    justifyContent: 'flex-start',
                    marginBottom: 20
                }}
                showsVerticalScrollIndicator={false}/>
        </View>
    );
}
