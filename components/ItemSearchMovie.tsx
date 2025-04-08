import {Image, Text, View} from "react-native";

const ItemSearchMovie = ({poster_path, title, vote_average, release_date, id}: Movie) => {
    return <View className="flex-row w-full bg-card rounded-2xl">
            <Image source={{uri: `https://image.tmdb.org/t/p/w500${poster_path}`}}
                   className="w-28 h-40 rounded-bl-2xl rounded-tl-2xl"/>
            <View className="flex-col w-full p-5">
                <Text className="text-lg font-bold text-white w-2/3 flex-shrink" numberOfLines={2}>{title}</Text>
                <Text className="text-sm text-gray-400">{release_date.split("-")[0]}</Text>
                <View className="bg-secondary-30 justify-center rounded-full mt-2 flex-row w-1/5 py-1">
                    <Text className="text-sm text-secondary text-secondary-100">⭐ {vote_average.toFixed(1)}</Text>
                </View>
            </View>
    </View>;
};

export default ItemSearchMovie;