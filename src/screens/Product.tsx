import { useNavigation, useRoute } from '@react-navigation/native';
import { AspectRatio, Box, Button, Center, Heading, HStack, Icon, IconButton, Image, KeyboardAvoidingView, Select, Spinner, Text, useTheme, VStack } from 'native-base';
import { CaretLeft, Check, Heart, HeartBreak, ShoppingCartSimple } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useQuery } from 'react-query';
import { BottomNavigation } from '../components/BottomNavigation';
import { TextField } from '../components/TextField';
import { useCart } from '../hooks/usecart';
import { useFavorite } from '../hooks/useFavorite';
import { useApi } from '../services/axios';

type ProductQueryParams = {
    productId: string
}

type ProductParams = {
    id: string
    name: string
    price: number
    qtyInStock: number
    avatarUrl: string
    provider: {
        name: string;
        state: string;
    }
}

export function Product() {

    const navigation = useNavigation()
    const route = useRoute()
    const { colors } = useTheme()
    const { addToCart, cartItems } = useCart()
    const { addToFavorites, favoriteItems } = useFavorite()
    const [isAddedInCart, setIsAddedInCart] = useState(false)



    const { productId } = route.params as ProductQueryParams
    const [unity, setUnity] = useState('unidades')
    const [showBottomNavigation, setShowBottomNavigation] = useState(true)
    const [qty, setQty] = useState(1)

    const handleGoBack = () => {
        navigation.goBack()
    }

    const { data } = useQuery<ProductParams>(['product', productId], async () => {
        const { data } = await useApi.get(`/product/${productId}`)
        return data
    })

    const itIsInFavorites = favoriteItems?.find(favorite => favorite.id == data?.id)
    const itIsInCart = cartItems?.find(cart => cart.id == data?.id)

    const handleAddToFavorites = () => {
        const dataToFavorites = {
            id: data?.id,
            price: data?.price,
            name: data?.name,
            avatarUrl: data?.avatarUrl
        }

        addToFavorites(dataToFavorites)
    }

    const handleAddToCart = () => {
        const dataTocart = {
            id: data?.id,
            unity,
            qty,
            price: data?.price,
            name: data?.name,
            avatarUrl: data?.avatarUrl
        }

        addToCart(dataTocart)
        setIsAddedInCart(true)
        setShowBottomNavigation(true)

    }


    const [isLoading, setIsLoading] = useState(false)

    return (
        <VStack flex={1} bg="white">
            <HStack pt={12} space={3} alignItems="center" bg="white" px={4}>
                <IconButton
                    onPress={handleGoBack}
                    _pressed={{
                        bg: "gray.100"
                    }}
                    icon={<Icon as={<CaretLeft color={colors.purple[900]} weight='bold' />} />} />
                <Heading color="purple.900">Detalhes</Heading>
            </HStack>
            <VStack
                flex={1}
                bg="gray.200">
                <Box bg="gray.200" pt={8}>
                    <Center
                        minH='1/2'
                        flex={1}
                        position="relative">
                        <AspectRatio ratio={{
                            base: 16 / 14,
                            md: 9 / 10
                        }} height={{
                            base: 200,
                            md: 400
                        }}>
                            <Image h="full" w="full" source={{ uri: data?.avatarUrl }} alt={`imagem de ${data?.name}`} />
                        </AspectRatio>
                    </Center>
                    <VStack px={4}>
                        <HStack justifyContent="space-between">
                            <VStack>
                                <Heading>{data?.name}</Heading>
                                <Text color="purple.800" fontSize="xl">{data?.price}</Text>
                            </VStack>
                            <Box>
                                <IconButton
                                    icon={
                                        <Icon as={
                                            itIsInFavorites
                                                ?
                                                <HeartBreak color={colors.purple[800]} weight='bold' />
                                                :
                                                <Heart color={colors.purple[800]} />
                                        }
                                        />
                                    }
                                    borderRadius="full"
                                    onPress={handleAddToFavorites} />
                            </Box>
                        </HStack>
                    </VStack>
                    <KeyboardAvoidingView h={{
                        base: "400px",
                        lg: "auto"
                    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <HStack
                            px={4}

                        >
                            <TextField
                                flex={1}
                                borderColor="gray.200"
                                borderWidth={1}
                                placeholder="quantidade"
                                keyboardType="number-pad"
                                h={12}
                                placeholderTextColor="purple.900"
                                bg="white"
                                onPressIn={() => setShowBottomNavigation(false)}
                                onChangeText={(e) => setQty(Number(e))} />
                            <Select
                                minWidth="170"
                                selectedValue={unity}
                                accessibilityLabel={unity}
                                placeholder={unity}
                                bg="white"
                                borderColor="white"
                                onValueChange={setUnity}
                                onOpen={() => setShowBottomNavigation(true)}>
                                <Select.Item label="unidades" value="Unidades" />
                                <Select.Item label="Toneladas" value="Toneladas" />
                                <Select.Item label="Caixas" value="Caixas" />
                            </Select>
                        </HStack>
                        <VStack
                            px={4}
                            mt={8}>
                            <Button
                                bg="purple.900"
                                _pressed={{
                                    bg: "purple.900",
                                }}
                                onPress={handleAddToCart}>
                                <HStack
                                    space={2}
                                    alignItems="center">
                                    <Text color="gray.50">
                                        {isAddedInCart ? 'successfuly added in cart' : 'add'}
                                    </Text>
                                    {
                                        isAddedInCart ? <Check color={colors.gray[50]} />
                                            : isLoading ? <Spinner color="gray.50" ml={2} /> : <ShoppingCartSimple color={colors.gray[50]} />
                                    }
                                </HStack>
                            </Button>
                        </VStack>
                    </KeyboardAvoidingView>
                </Box>
            </VStack>
            {showBottomNavigation && <BottomNavigation />}
        </VStack>
    );
}