import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cart } from "../screens/Cart";
import { Order } from "../screens/Order";
import { Search } from "../screens/Search";
import { Home } from "../screens/Home";
import { Product } from "../screens/Product";
import { Favorites } from "../screens/Favorites";


const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes(){
    return (
        <Navigator screenOptions={{
            headerShown: false
        }}>
            <Screen name="home" component={Home}/>
            <Screen name="cart" component={Cart}/>
            <Screen name="favorites" component={Favorites}/>
            <Screen name="order" component={Order}/>
            <Screen name="search" component={Search}/>
            <Screen name="product" component={Product}/>
        </Navigator>
    );
}