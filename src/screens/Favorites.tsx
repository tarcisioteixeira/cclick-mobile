import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import {
    Badge,
    Box,
    Heading,
    HStack,
    Icon,
    IconButton,
    useTheme,
    VStack
} from 'native-base';
import { CaretLeft, Heart } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { BottomNavigation } from '../components/BottomNavigation';
import { FavoriteBase } from '../components/FavoriteBase';
import { useFavorite } from '../hooks/useFavorite';

export function Favorites() {

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const [favorites, setFavorites] = useState([])
    
    const { colors } = useTheme()
    const { favoriteItems, removeFromFavorites } = useFavorite()

   
    return (
        <VStack flex={1} bg="white">

            <HStack
                pt={12}
                pb={2}
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                px={4}>
                <HStack space={1} alignItems="center">
                    <IconButton
                        onPress={handleGoBack}
                        _pressed={{
                            bg: "gray.100"
                        }}
                        icon={<Icon as={<CaretLeft color={colors.purple[900]} weight='bold' />} />} />
                    <Heading color="purple.900" fontSize={20}>your favorites</Heading>
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
                            borderColor="white">
                            {favoriteItems.length}
                        </Badge>
                    )}
                    <Heart color={colors.purple[900]} weight="bold" />

                </Box>
            </HStack>


            <VStack
                flex={1}
                borderTopLeftRadius={16}
                borderTopRightRadius={16}
                bg="gray.300">

                <MasonryList
                    data={favoriteItems}
                    keyExtractor={(item): string => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 4,
                        paddingBottom: 16,
                        paddingRight: 4 
                    }}
                    renderItem={({ item }: any) => (
                        <FavoriteBase favorite={item} removeFromFavorite={removeFromFavorites}/>
                    )}

                />

            </VStack>
            <BottomNavigation route="favorites" />
        </VStack>

    );
}