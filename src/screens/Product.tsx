import { useNavigation } from '@react-navigation/native';
import { Center, Pressable, Text, VStack } from 'native-base';
import React from 'react';

export function Product() {

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }
    return (
        <VStack flex={1}>
            <Center flex={1} bg="purple.900">
                <Pressable onPress={handleGoBack}>
                    <Text>Voltar</Text>
                </Pressable>
            </Center>
        </VStack>
    );
}