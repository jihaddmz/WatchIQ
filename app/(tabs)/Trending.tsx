import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/stores/store";
import {useCallback, useEffect} from "react";
import fetchTrendingMoviesAction from "@/state/actions/FetchTrendingMoviesAction";
import ItemTrendingMovie from "@/components/ItemTrendingMovie";
import {useFocusEffect} from "expo-router";
import fetchMoviesAction from "@/state/actions/FetchMoviesAction";
import FetchTrendingMoviesAction from "@/state/actions/FetchTrendingMoviesAction";

const Trending = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {movies, loading, error} = useSelector((state: RootState) => state.movie);

    useFocusEffect(
        useCallback(() => {
            dispatch(FetchTrendingMoviesAction());
        }, [])
    )

    if (loading) {
        return <View className="flex-1 bg-black">
            <ActivityIndicator className="justify-center items-center flex-1" size="small" color="white"/>
        </View>
    }

    if (error) {
        return <View className="flex-1 bg-black">
            <Text className="justify-center items-center flex-1 text-red-600">Error: {error}</Text>
        </View>
    }

    return <View className="bg-black flex-1">
        <View className="pt-10 ps-5">
            <Text className="mb-5 text-white font-bold text-2xl">Trending Now</Text>
        </View>

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