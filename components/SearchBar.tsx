import {TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

type Props = {
    onChangeText: (text: string) => void;
    value: string;
}

const SearchBar = ({onChangeText, value}: Props) => {
    return (
        <View className="bg-card flex-row w-full items-center p-2 px-5 rounded-2xl">
            <Ionicons name="search" size={24} color="gray"/>
            <TextInput value={value} onChangeText={onChangeText} className="w-full ms-2 text-white" placeholder="Search Movies..." placeholderTextColor={"gray"}/>
        </View>
    );
}

export default SearchBar;