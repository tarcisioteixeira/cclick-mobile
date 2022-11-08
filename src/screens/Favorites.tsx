import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import {
    AspectRatio,
    Badge,
    Box, Center, Heading,
    HStack,
    Icon,
    IconButton,
    Image,
    Pressable,
    Text, useTheme, VStack
} from 'native-base';
import { CaretLeft, Heart, HeartBreak } from 'phosphor-react-native';
import React from 'react';
import { useFavorite } from '../hooks/useFavorite';

export function Favorites() {

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleGoToDeatail = (id: string) => {
        navigation.navigate('product',{ productId: id })
    }

    const { colors } = useTheme()

    const { favoriteItems, removeFromFavorites } = useFavorite()

    return (
        <VStack flex={1} bg="purple.800">

            <HStack
                pt={12}
                pb={2}
                justifyContent="space-between"
                alignItems="center"
                bg="purple.800"
                px={4}>
                <HStack space={1} alignItems="center">
                    <IconButton
                        onPress={handleGoBack}
                        _pressed={{
                            bg: "purple.800"
                        }}
                        icon={<Icon as={<CaretLeft color="white" weight='bold' />} />} />
                    <Heading color="purple.100" fontSize={20}>your favorites</Heading>
                </HStack>
                <Box>

                    {favoriteItems?.length > 0 && (
                        <Badge
                            colorScheme="error"
                            alignSelf="center"
                            rounded="full"
                            ml={-6}
                            mb={-2}
                            zIndex={1}
                            borderWidth="3"
                            borderColor="purple.800">
                            {favoriteItems.length}
                        </Badge>
                    )}
                    <Heart color="white" />

                </Box>
            </HStack>


            <VStack
                flex={1}
                borderTopLeftRadius={16}
                borderTopRightRadius={16}
                bg="gray.200">

                <MasonryList
                    data={favoriteItems}
                    keyExtractor={(item): string => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingVertical: 20
                    }}
                    renderItem={({ item }: any) => (
                        <Pressable
                            shadow={9}
                            bg="white"
                            rounded="md"
                            ml={1}
                            mt={1}
                            borderWidth={1}
                            borderColor="gray.100"
                            position="relative"
                            onPress={()=> handleGoToDeatail(item.id)}
                        >
                            <VStack>
                                <Center bg="gray.100" roundedTopLeft="lg" roundedTopRight="lg">
                                    <AspectRatio ratio={{
                                        base: 3 / 4,
                                        md: 9 / 10
                                    }} height={{
                                        base: 200,
                                        md: 400
                                    }}>
                                        <Image alt={`imagem de ${item?.name}`} source={{
                                            uri: item?.avatarUrl
                                        }} />
                                    </AspectRatio>
                                </Center>
                                <HStack justifyContent="space-between" alignItems="center">

                                    <VStack py={1} px={2}>
                                        <Heading fontSize="md">{item?.name}</Heading>
                                        <Text>{item?.price}</Text>
                                    </VStack>

                                    <IconButton
                                        onPress={() => removeFromFavorites(item.id)}
                                        _pressed={{
                                            bg: "purple.200"
                                        }}
                                        icon={<Icon as={<HeartBreak color={colors.purple[800]} weight='bold' />} />} />

                                </HStack>

                            </VStack>
                        </Pressable>
                    )}

                />

            </VStack>
        </VStack>

    );
}