import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/stores/store";
import {useCallback} from "react";
import fetchMoviesAction from "@/state/actions/FetchMoviesAction";
import ItemMovie from "@/components/itemMovie";
import {appRoute, setAppRoute} from "@/core/Helpers";
import {useFocusEffect} from "expo-router";

export default function Index() {
    const dispatch = useDispatch<AppDispatch>();
    const {movies, loading, error} = useSelector((state: RootState) => state.movie);

    useFocusEffect(
        useCallback(() => {

            if (!appRoute || appRoute === 'Trending' || appRoute === 'Search') {
                dispatch(fetchMoviesAction());
            }

            setAppRoute("Index");

        }, [dispatch]))

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

    return (
        <View
            className="flex-1 bg-black"
        >
            <View className="pt-10 ps-5">
                <Text className="mb-5 text-white font-bold text-2xl">Movies</Text>
            </View>

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
