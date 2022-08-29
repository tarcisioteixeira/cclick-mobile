import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, Pressable, Text, VStack } from 'native-base';
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
        navigation.navigate('product',{productId: data.id})
    }

    return (
        <Pressable 
        flex={1} 
        ml={1} 
        mt={1}
        onPress={handleGoToDetail}>
            <VStack
                rounded="lg"
                borderWidth={1}
                borderColor="gray.100">
                <Center bg="gray.100" roundedTopLeft="lg" roundedTopRight="lg">
                    <Image size={120} alt={`imagem de ${data.name}`} borderRadius={100} source={{
                        uri: data.avatarUrl
                    }} />
                </Center>
                <VStack py={1} px={2}>
                    <Heading fontSize="md">{data.name}</Heading>
                    <Text>{data.price}</Text>
                </VStack>
            </VStack>

        </Pressable>
    );
}