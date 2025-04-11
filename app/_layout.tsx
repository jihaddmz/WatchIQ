import {Stack} from "expo-router";
import "../global.css";
import {StatusBar} from "react-native";
import {Provider} from "react-redux";
import {movieStore} from "@/state/stores/store";
import {SafeAreaView} from "react-native-safe-area-context";

export default function RootLayout() {

    return <SafeAreaView className="flex-1 bg-black">
        <StatusBar barStyle="light-content" backgroundColor={"#000000"} translucent={true}/>

        <Provider store={movieStore}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(tabs)" options={{title: "Home"}}/>
                <Stack.Screen name="movie/[id]" options={{title: "Movie Detail"}}/>
            </Stack>
        </Provider>
    </SafeAreaView>;
}
