import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import {ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/stores/store";
import {useCallback} from "react";
import fetchMovieDetailsAction from "@/state/actions/FetchMovieDetailsAction";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";

const MovieDetails = () => {
    const {id} = useLocalSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const {movieDetails, castMembers, loading, error} = useSelector((state: RootState) => state.movieDetails);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {

            dispatch(fetchMovieDetailsAction(Number(id)));

            return () => {
            }
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

    return (
        <View className="bg-black flex-1">

            {/* Sticky back button */}
            <View className="bg-gray-500 p-2 rounded-full opacity-60 absolute top-12 left-5 z-10">
                <Ionicons
                    name="arrow-back"
                    size={20}
                    color="white"
                    onPress={() => {
                        router.back();
                    }}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                <ImageBackground source={{uri: `https://image.tmdb.org/t/p/w500${movieDetails!.poster_path}`}}
                                 className="w-full h-96 z-0"
                                 resizeMode={"stretch"}>

                    <LinearGradient
                        colors={['transparent', 'black']}
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            position: 'absolute',
                            height: '100%', // Controls how much of the image gets the black gradient
                        }}
                    />
                    <View className="flex-col flex-1 justify-end items-start px-5 pb-2">
                        <Text className="text-white font-bold text-3xl">{movieDetails!.title}</Text>
                        <View className="flex-row items-end justify-around mt-3">
                            <View className="flex-1 flex-row items-center">
                                <Ionicons name="star" color={"yellow"} size={15}/>
                                <Text className="text-gray-400 ml-1">{movieDetails!.vote_average.toFixed(1)}</Text>
                            </View>

                            <View className="flex-1 flex-row items-center">
                                <Ionicons name="time" color={"gray"} size={15}/>
                                <Text className="text-gray-400 ml-1">{movieDetails!.runtime}</Text>
                            </View>

                            <View className="flex-1 flex-row items-center">
                                <Ionicons name="calendar" color={"gray"} size={15}/>
                                <Text className="text-gray-400 ml-1">{movieDetails!.release_date.split("-")[0]}</Text>
                            </View>

                            <View className="flex-1 flex-row items-center">
                                <Ionicons name="thumbs-up" color={"gray"} size={15}/>
                                <Text className="text-gray-400 ml-1">{movieDetails!.vote_count}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {/* Genres */}
                <View className="mt-4 mx-4">
                    <ScrollView contentContainerStyle={{
                        columnGap: 10
                    }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {movieDetails!.genres.map((genre, index) => {
                            return <View key={`${genre.id}`} className="bg-card px-4 py-0.5 rounded-full">
                                <Text key={index} className="text-white font-bold">{genre.name}</Text>
                            </View>
                        })}
                    </ScrollView>
                </View>

                {/*  Overview  */}
                <View className="mt-10 ms-4">
                    <Text className="text-white font-bold text-2xl">Overview</Text>
                    <Text className="text-gray-400 font-bold mt-3">{movieDetails!.overview}</Text>
                </View>

                {/* Cast Members */}
                <View className="mt-10 ms-4">
                    <Text className="text-white font-bold text-2xl">Cast</Text>
                    <ScrollView contentContainerStyle={{
                        gap: 10
                    }} className="mt-3" horizontal={true} showsHorizontalScrollIndicator={false}>
                        {castMembers!.map((cast, index) => {
                            return <View key={`${cast.id}`} className="flex-col items-center w-28">
                                <View key={`${cast.id}`}
                                      className="bg-card rounded-full w-15 h-15 justify-center items-center">
                                    <Text key={index}
                                          className="text-white font-bold text-2xl">{cast.name.at(0)}</Text>
                                </View>
                                <Text className="text-gray-400 font-bold text-center">{cast.name}</Text>
                            </View>

                        })}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

export default MovieDetails;