import {Image, Text, View} from "react-native";

const ItemMovie = ({poster_path, title }: Movie) => {
    return (
        <View className="flex-1 flex-col">
            <Image resizeMode={"cover"} source={{uri: `https://image.tmdb.org/t/p/w500${poster_path}`}} className="w-full h-52 rounded-lg"/>
            <Text className="text-white font-bold mt-1">{title}</Text>
        </View>
    );
}

export default ItemMovie;