import {Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Link href="../movie/123" asChild>
            <TouchableOpacity>
                <Text className="text-gray-500">Edit app/index.tsx to edit this screen.</Text>
            </TouchableOpacity>
        </Link>

    </View>
  );
}
