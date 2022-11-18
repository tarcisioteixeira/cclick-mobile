import { useNavigation } from '@react-navigation/native';
import { HStack, Icon, IconButton, useTheme } from 'native-base';
import { Heart, House, ShoppingCartSimple } from 'phosphor-react-native';
import React from 'react';
import { useAuth } from '../context/auth';

interface INavigateProps {
    route?: string
}

export function BottomNavigation({route}: INavigateProps) {

    const { isAuthenticated } = useAuth()
    const navigation = useNavigation()

    const handleGoHome = () => {
        navigation.navigate('home')
    }

    const { colors } = useTheme()

    const handleGoToCart = () => {
        if (isAuthenticated) {
            navigation.navigate('cart')
            return
        }

        navigation.navigate('auth', { redirectTo: 'cart' })
    }

    const handleGoToFavorites = () => {
        if (isAuthenticated) {
            navigation.navigate('favorites')
            return
        }

        navigation.navigate('auth', { redirectTo: 'favorites' })
    }

    return (
        <HStack
            bg="white"
            h={14}
            alignItems="center"
            justifyContent="center"
            space={3}
            shadow={9}>
            <IconButton
                icon={
                    <Icon as={<House color={colors.purple[800] } weight="bold"/>} />
                }
                rounded="full"
                bg="gray.200"
                borderWidth="3"
                borderColor="white"
                mt={-19}
                shadow={9}
                _pressed={{
                    bg: "gray.100"
                }}
                onPress={handleGoHome}
            />
            <IconButton
                icon={
                    <Icon as={<Heart color={colors.purple[800] } weight="bold"/>} />
                }
                bg="gray.200"
                borderWidth="3"
                borderColor="white"
                mt={-19}
                shadow={9}
                rounded="full"
                _pressed={{
                    bg: "gray.100"
                }}
                onPress={handleGoToFavorites}
            />
            <IconButton
                icon={
                    <Icon as={<ShoppingCartSimple color={colors.purple[800] } weight="bold"/>} />
                }
                bg="gray.200"
                rounded="full"
                borderWidth="3"
                borderColor="white"
                mt={-19}
                shadow={9}
                _pressed={{
                    bg: "gray.100"
                }}
                onPress={handleGoToCart}
            />
        </HStack>

    );
}