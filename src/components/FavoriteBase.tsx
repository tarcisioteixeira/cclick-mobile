import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, Icon, IconButton, Pressable, Text, useTheme, VStack } from 'native-base';
import { HeartBreak } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useFavorite } from '../hooks/useFavorite';

type favorite = {
    id: string;
    name: string;
    avatarUrl: string;
    price: number;
}

interface IFavorite {
    favorite: favorite
    removeFromFavorite: any
}

export function FavoriteBase({ favorite, removeFromFavorite }: IFavorite) {

    const { removeFromFavorites } = useFavorite()
    const { colors } = useTheme()
    const navigation = useNavigation()

    const [ratio, setRatio] = useState(1 / 2)

    Image.getSize(favorite?.avatarUrl, (width, height) => {
        setRatio(width / height)
    })


    const handleGoToDeatail = (id: string) => {
        navigation.navigate('product', { productId: id })
    }



    return (
        <Pressable
            shadow={9}
            bg="white"
            rounded="md"
            ml={1}
            mt={1}
            borderWidth={1}
            borderColor="gray.100"
            position="relative"
            onPress={() => handleGoToDeatail(favorite?.id)}
        >
            <VStack>
                <Image resizeMode="cover" source={{
                    uri: favorite?.avatarUrl
                }} style={[styles.image, { aspectRatio: ratio }]} />

                <HStack justifyContent="space-between" alignItems="center">

                    <VStack py={1} px={2}>
                        <Heading fontSize="md">{favorite?.name}</Heading>
                        <Text>{favorite?.price}</Text>
                    </VStack>

                    <IconButton
                        onPress={() => removeFromFavorite(favorite?.id)}
                        _pressed={{
                            bg: "purple.200"
                        }}
                        icon={<Icon as={<HeartBreak color={colors.purple[800]} weight='bold' />} />} />

                </HStack>

            </VStack>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7
    }
})