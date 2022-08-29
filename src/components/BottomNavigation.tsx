import { useNavigation } from '@react-navigation/native';
import { HStack, Icon, IconButton } from 'native-base';
import { House, ShoppingCartSimple } from 'phosphor-react-native';
import React from 'react';
import { useAuth } from '../context/auth';

export function BottomNavigation() {

    const { isAuthenticated } = useAuth()
    const navigation = useNavigation()

    const handleGoHome = () => {
        navigation.navigate('home')
    }

    const handleGoToCart = () => {
        if(isAuthenticated){
            navigation.navigate('cart')
            return
        }

        navigation.navigate('auth', {redirectTo: 'cart'})
    }

    return (
        <HStack
            bg="purple.800"
            h={14}
            alignItems="center"
            justifyContent="center"
            space={3}>
            <IconButton
                icon={
                    <Icon as={<House color="white" />} />
                }
                rounded="full"
                _pressed={{
                    bg: "purple.900"
                }} 
                onPress={handleGoHome}
                />
            <IconButton
                icon={
                    <Icon as={<ShoppingCartSimple color="white" />} />
                }
                rounded="full"
                _pressed={{
                    bg: "purple.900"
                }} 
                onPress={handleGoToCart}
                />
        </HStack>

    );
}