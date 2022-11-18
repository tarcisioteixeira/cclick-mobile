import { useNavigation } from '@react-navigation/native';
import { Heading, Pressable, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Image as ImageNT, StyleSheet } from 'react-native';

export type ProductProps = {
    id: string;
    name: string;
    avatarUrl: string;
    price: number;
}

type BaseProductProps = {
    data: ProductProps
}

export function BaseProduct({ data }: BaseProductProps) {

    const [ratio, setRatio] = useState(1 / 2)

    ImageNT.getSize(data.avatarUrl, (width, height) => {
        setRatio(width / height)
    })

    const navigation = useNavigation()

    const handleGoToDetail = () => {
        navigation.navigate('product', { productId: data.id })
    }

    return (
        <Pressable
            mt={1}
            ml={1}
            flex={1}
            rounded="xl"
            bg="white"
            shadow={9}
            borderWidth={1}
            borderColor="gray.100"
            onPress={handleGoToDetail}>
            <VStack
                rounded="lg"
            >

                <ImageNT resizeMode="cover" source={{
                    uri: data.avatarUrl
                }} style={[styles.image, { aspectRatio: ratio }]} />

                <VStack py={1} px={2}>
                    <Heading fontSize="md">{data.name}</Heading>
                    <Text>{data.price}</Text>
                </VStack>
            </VStack>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13
    }
})