import {Image, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";

const ItemMovie = ({poster_path, title, id}: Movie) => {
    return (
        <View className="flex-1 flex-col">
            <Link href={`/movie/${id}`} asChild>
                <TouchableOpacity>
                    <Image resizeMode={"cover"} source={{uri: `https://image.tmdb.org/t/p/w500${poster_path}`}}
                           className="w-full h-52 rounded-lg"/>
                    <Text className="text-white font-bold mt-1 ms-2">{title}</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

export default ItemMovie;