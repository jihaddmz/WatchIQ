import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";

const ItemTrendingMovie = ({poster_path, vote_average, title, vote_count, id}: Movie) => {
    return <View className="overflow-hidden rounded-lg">
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity>
                <ImageBackground source={{uri: `https://image.tmdb.org/t/p/w500${poster_path}`}}
                                 className="w-full h-52 z-0"
                                 resizeMode="cover">
                    <View className="flex-1 justify-end p-3">
                        <Text className="text-white font-bold text-xl">{title}</Text>
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center">
                                <Ionicons name="star" size={15} color={"yellow"}/>
                                <Text className="text-secondary font-bold ms-1 text-secondary-100">{vote_average.toFixed(1)}</Text>
                            </View>

                            {/* the vote count card */}
                            <View className="flex-row bg-primary py-1 px-3 rounded-full">
                                <Ionicons name="thumbs-up" size={15} color={"white"}/>
                                <Text className="text-white font-bold ms-1">{vote_count}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </Link>

    </View>;
};
export default ItemTrendingMovie;