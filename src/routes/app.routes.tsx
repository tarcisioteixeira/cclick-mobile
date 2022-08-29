import { Home } from "../screens/Home";
import { Signin } from "../screens/Signin";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Search } from "../screens/Search";
import { Product } from "../screens/Product";
const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes(){
    return (
        <Navigator screenOptions={{
            headerShown: false
        }}>
            <Screen name="home" component={Home}/>
            <Screen name="search" component={Search}/>
            <Screen name="product" component={Product}/>
            <Screen name="auth" component={Signin}/>
        </Navigator>
    );
}
