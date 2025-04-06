import {Stack} from "expo-router";
import "../global.css";
import {StatusBar} from "react-native";
import {Provider} from "react-redux";
import {movieStore} from "@/state/stores/store";

export default function RootLayout() {

    return <>
        <StatusBar barStyle="light-content" backgroundColor={"#000000"} translucent={true}/>
        <Provider store={movieStore}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(tabs)" options={{title: "Home"}}/>
                <Stack.Screen name="movie/[id]" options={{title: "Movie Detail"}}/>
            </Stack>
        </Provider>
    </>;
}
