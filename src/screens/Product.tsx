import { useNavigation, useRoute } from '@react-navigation/native';
import { AspectRatio, Box, Button, Center, Heading, HStack, Icon, IconButton, Image, KeyboardAvoidingView, Select, Spinner, Text, useTheme, VStack } from 'native-base';
import { CaretLeft, Heart, ShoppingCartSimple } from 'phosphor-react-native';
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
    const { addToCart, cartItems } = useCart()
    const { addToFavorites } = useFavorite()

    const { productId } = route.params as ProductQueryParams
    const [unity, setUnity] = useState('')
    const [qty, setQty] = useState(1)

    const handleGoBack = () => {
        navigation.goBack()
    }

    const { data } = useQuery<ProductParams>(['product', productId], async () => {
        const { data } = await useApi.get(`/product/${productId}`)
        console.log(data)
        return data
    })

    const handleAdToFavorites = () => {
        const dataToFavorites = {
            id: data.id,
            price: data.price,
            name: data.name,
            avatarUrl: data.avatarUrl
        }
    }

    const handleAdTocart = () => {
        const dataTocart = {
            id: data.id,
            unity,
            qty,
            price: data.price,
            name: data.name,
            avatarUrl: data.avatarUrl
        }

        addToCart(dataTocart)
    }

    const { colors } = useTheme()

    const [isLoading, setIsLoading] = useState(false)

    return (
        <VStack flex={1} bg="purple.800">
            <HStack pt={12} space={3} alignItems="center" bg="purple.800" px={4}>
                <IconButton
                    onPress={handleGoBack}
                    _pressed={{
                        bg: "purple.800"
                    }}
                    icon={<Icon as={<CaretLeft color="white" weight='bold' />} />} />
                <Heading color="purple.100">Detalhes</Heading>
            </HStack>
            <VStack
                flex={1}
                bg="gray.50"
                borderBottomLeftRadius={20}
                borderBottomRightRadius={20}>
                <Box bg="gray.50" pt={8}>
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
                                <IconButton icon={
                                    <Icon as={<Heart color={colors.purple[800]} />} />
                                } borderRadius="full" />
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
                                placeholder="qty"
                                h={12}
                                placeholderTextColor="purple.900"
                                selectionColor="purple.100"
                                bg="gray.50"
                                
                                onChangeText={(e) => setQty(Number(e))} />
                            <Select minWidth="170" accessibilityLabel="unidades" placeholder="unidades" >
                                <Select.Item label="unidades" value="ux" />
                                <Select.Item label="Toneladas" value="ux" />
                                <Select.Item label="Caixas" value="ux" />
                            </Select>
                        </HStack>
                        <VStack
                            px={4}
                            mt={8}>
                            <Button
                                bg="purple.700"
                                _pressed={{
                                    bg: "purple.900",
                                }}
                                onPress={handleAdTocart}>
                                <HStack
                                    space={2}
                                    alignItems="center">
                                    <Text color="gray.50">
                                        add
                                    </Text>
                                    {isLoading ? <Spinner color="gray.50" ml={2} /> : <ShoppingCartSimple color={colors.gray[50]} />}
                                </HStack>
                            </Button>
                        </VStack>
                    </KeyboardAvoidingView>
                </Box>
            </VStack>
            <BottomNavigation />
        </VStack>
    );
}