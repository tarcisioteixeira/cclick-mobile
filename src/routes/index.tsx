import { NavigationContainer } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import { useAuth } from "../context/auth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {

    const { isAuthenticated} = useAuth()

    return (
        <NavigationContainer>
            {
                isAuthenticated ? <AuthRoutes/>
                : <AppRoutes/>
            }
        </NavigationContainer>
    )
}