import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/stores/store";
import {useCallback} from "react";
import FetchTrendingMoviesAction from "@/state/actions/FetchTrendingMoviesAction";
import ItemTrendingMovie from "@/components/ItemTrendingMovie";
import {useFocusEffect} from "expo-router";
import {appRoute, setAppRoute} from "@/core/Helpers";
import {resetMovies} from "@/state/reducers/movieSlice";

const Trending = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {movies, loading, error} = useSelector((state: RootState) => state.movie);

    useFocusEffect(
        useCallback(() => {
            const execute = async () => {
                if (appRoute === "Index" || appRoute === 'Search') {
                    dispatch(FetchTrendingMoviesAction());
                }
                setAppRoute("Trending");
            }

            dispatch(resetMovies());

            setTimeout(() => {
                execute();
            }, 100)
        }, [])
    )

    return <View className="bg-black flex-1">
        <View className="pt-10 ps-5">
            <Text className="mb-5 text-white font-bold text-2xl">Trending Now</Text>
        </View>

        {loading && <View className="z-10 justify-center items-center absolute top-0 bottom-0 right-0 left-0">
            <ActivityIndicator size="large" color="white"/>
        </View>}

        {error && <View className="z-10 justify-center items-center absolute top-0 bottom-0 right-0 left-0">
            <Text className=" flex-1 text-red-600">Error: {error}</Text>
        </View>}

        <FlatList
            className="px-5"
            data={movies}
            renderItem={({item}) => {
                return <ItemTrendingMovie {...item}/>
            }}
            contentContainerStyle={{
                gap: 10
            }}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}/>

    </View>;
};

export default Trending;