import { useNavigation } from '@react-navigation/native';
import { AspectRatio, Heading, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';

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

    const navigation = useNavigation()

    const handleGoToDetail = () => {
        navigation.navigate('product', { productId: data.id })
    }

    return (
        <Pressable
            flex={1}
            ml={1}
            mt={1}
            bg="white"
            rounded="md"
            shadow={9}
            onPress={handleGoToDetail}>
            <VStack
                rounded="lg"
                borderWidth={1}
                borderColor="gray.100">
                <AspectRatio ratio={{
                    base: 3 / 4,
                    md: 9 / 10
                }} height={{
                    base: 200,
                    md: 400
                }}>
                    <Image resizeMode="cover" source={{
                        uri: data.avatarUrl
                    }} alt="Picture of a Flower" />
                </AspectRatio>
                <VStack py={1} px={2}>
                    <Heading fontSize="md">{data.name}</Heading>
                    <Text>{data.price}</Text>
                </VStack>
            </VStack>

        </Pressable>
    );
}