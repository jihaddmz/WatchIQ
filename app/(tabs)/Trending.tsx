import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/stores/store";
import {useCallback} from "react";
import FetchTrendingMoviesAction from "@/state/actions/FetchTrendingMoviesAction";
import ItemTrendingMovie from "@/components/ItemTrendingMovie";
import {useFocusEffect} from "expo-router";

const Trending = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {trendingMovies, loading, error} = useSelector((state: RootState) => state.movie);

    useFocusEffect(
        useCallback(() => {
            const execute = async () => {
                if (trendingMovies.length === 0) {
                    dispatch(FetchTrendingMoviesAction());
                }
            }

            setTimeout(() => {
                execute();
            }, 100)
        }, [trendingMovies])
    )

    return <View className="bg-black flex-1">
        <View className="ps-5">
            <Text className="mb-5 text-white font-bold text-2xl">Trending Now</Text>
        </View>

        {loading && <View className="z-10 flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="white"/>
        </View>}

        {error && <View className="z-10 justify-center items-center absolute top-0 bottom-0 right-0 left-0">
            <Text className="text-red-600">Error: {error}</Text>
        </View>}

        {trendingMovies.length > 0 &&
            <FlatList
                className="px-5"
                data={trendingMovies}
                renderItem={({item}) => {
                    return <ItemTrendingMovie {...item}/>
                }}
                contentContainerStyle={{
                    gap: 10
                }}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}/>
        }

    </View>;
};

export default Trending;