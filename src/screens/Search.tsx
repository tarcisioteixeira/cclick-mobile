import { useNavigation } from '@react-navigation/native';
import {
    Center,
    FlatList,
    Heading,
    HStack,
    Icon,
    IconButton,
    Image, Pressable, Text, useTheme,
    VStack
} from 'native-base';
import { CaretLeft, MagnifyingGlass } from 'phosphor-react-native';
import React, { useState } from 'react';
import { BottomNavigation } from '../components/BottomNavigation';
import { TextField } from '../components/TextField';
import { searchDebounce } from '../utils/searchDebounce';

export function Search() {

    const { colors } = useTheme()
    const navigation = useNavigation()
    const [productsSearched, setProductsSearched] = useState(null)
    
    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleGoToDetail = (productId: string) => {
        navigation.navigate('product', { productId })
    }

    function handleSearchProducts(e: any) {
        searchDebounce(e, setProductsSearched)
    }

    return (
        <VStack flex={1} bg="white">

            <HStack
                bg="white"
                py={4}
                w="full"
                pt={12}
                px={4}
                justifyContent="space-between">
                <IconButton
                    icon={
                        <Icon as={<CaretLeft color={colors.purple[900]} weight="bold" />} />
                    }
                    _pressed={{
                        bg: "gray.100"
                    }}
                    onPress={handleGoBack} />
                <TextField
                    flex="1"
                    h={14}
                    rounded="md"
                    placeholder='pesquise aqui..'
                    placeholderTextColor="purple.900"
                    selectionColor="purple.900"
                    pl={2}
                    color="purple.900"
                    autoFocus={true}
                    _focus={{
                        bg: "white"
                    }}
                    onChangeText={(e => handleSearchProducts(e))}
                    InputRightElement={
                        <IconButton
                            icon={
                                <Icon as={<MagnifyingGlass color={colors.purple[900]} weight="bold" />} />
                            }
                            _pressed={{
                                bg: "gray.100"
                            }}
                        />}
                />
            </HStack>

            <VStack
                flex={1}
                bg="gray.300">
                <FlatList
                    data={productsSearched}
                    keyExtractor={(product: any) => product.id}
                    renderItem={({ item }: any) => (
                        <Pressable
                            bg="gray.50"
                            rounded="sm"
                            shadow={9}
                            py="2"
                            mt={1}
                            onPress={() => handleGoToDetail(item?.id)}>
                            <HStack space={3}>
                                <Center>
                                    <Image
                                        size={70}
                                        resizeMode='cover'
                                        alt={`imagem de ${item?.name}`}
                                        rounded="md"
                                        source={{
                                            uri: item?.avatarUrl
                                        }} />
                                </Center>
                                <VStack>
                                    <Heading color="gray.700" fontSize="md">{item?.name}</Heading>
                                    <Text color="purple.800" fontWeight="bold">{item?.price} kz</Text>
                                </VStack>
                            </HStack>

                        </Pressable>
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingVertical: 10
                    }}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                />
            </VStack>

            <BottomNavigation />
        </VStack>
    );
}