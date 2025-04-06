// @ts-nocheck
import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {Text} from "react-native";


export default function  _layout(){
    return <Tabs screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused , color, size}) => {
            let iconName: string;
            if (route.name === "index") {
                iconName = "home";
            } else if (route.name === "Trending"){
                iconName = "trending-up";
            } else {
                iconName = "search";
            }
            return <Ionicons name={iconName} color={color} size={size}/>
        },
        tabBarLabel: ({focused}) => {
            let label: string;
            if (route.name === "index") {
                label = "Home";
            } else if (route.name === "Trending"){
                label = "Trending"
            } else {
                label = "Search"
            }
            return focused ? <Text className="text-sm">{label}</Text> : null}
    })}>
    </Tabs>
}