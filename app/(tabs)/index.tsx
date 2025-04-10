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
    let numberOfVisibleMovies = 0;

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
            <View className="pt-12 ps-5">
                <Text className="mb-5 text-white font-bold text-2xl">Browse Movies</Text>
            </View>

            {loading && <View className="z-10 justify-center items-center flex-1">
                <ActivityIndicator size="large" color="white"/>
            </View>}

            {error && <View className="z-10 justify-center items-center flex-1">
                <Text className=" text-red-600">Error: {error}</Text>
            </View>}

            { movies.length > 0 &&
            <FlatList
                data={movies}
                renderItem={({item}) => {
                    return <ItemMovie {...item}/>
                }}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                // onViewableItemsChanged={(info) => {
                //     numberOfVisibleMovies += info.changed.length
                //     console.log(`the length is ${numberOfVisibleMovies}`);
                // }}
                // onScrollBeginDrag={(event) => {
                //     console.log(`The event is ${event.nativeEvent.contentOffset.y}`)
                //     console.log(`The event1 is ${event.nativeEvent.contentSize.height}`)
                // }}
                columnWrapperStyle={{
                    gap: 10,
                    justifyContent: 'flex-start',
                    marginBottom: 20
                }}
                showsVerticalScrollIndicator={false}/>
            }
        </View>
    );
}
