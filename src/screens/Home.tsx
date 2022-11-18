import { useNavigation } from '@react-navigation/native';
import { Box, Center, HStack, Icon, Image, Pressable, ScrollView, Spinner, Text, useTheme, VStack } from 'native-base';
import { MagnifyingGlass } from 'phosphor-react-native';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { BaseProduct } from '../components/BaseProduct';
import { BottomNavigation } from '../components/BottomNavigation';
import { useApi } from '../services/axios';
import MasonryList from '@react-native-seoul/masonry-list';

import { products as prod } from '../hooks/mock';

type ProductParams = {
  id: string;
  name: string;
  avatarUrl: string;
  price: number
}

export function Home() {

  const navigation = useNavigation()
  const [activeCategory, setActiveCategory] = useState("Agricultura")
  const [page, setPage] = useState(1)
  const [take, setTake] = useState(10)
  const [totalCountProducts, setTotalCountProducts] = useState(0)
  const [products, setProducts] = useState<ProductParams[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [shouldefresh, setShouldRefresh] = useState(false)

  const handleGoToSearch = () => {
    navigation.navigate('search')
  }

  const hanldeToggleCategory = (category: string) => {
    setPage(1)
    setActiveCategory(category)
  }

  const refetch = () => {
    if (page < totalCountProducts) {
      setPage(prev => prev + 1)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setPage(1)
  }

  const { data: categories } = useQuery<Array<{
    id: string;
    name: string;
    slug: string;
  }>>('categories', async () => {
    const { data } = await useApi.get('/categories-only')
    console.log(data)
    return data
  })

  const { data, isLoading } = useQuery<{
    total: number
    products: ProductParams[]
  }>([`products-${activeCategory}`, page], async () => {
    const { data } = await useApi.get(`/products-filter/${activeCategory}?filter=category&page=${page}&take=${take}`)
    setTotalCountProducts(Math.ceil(data.total / take))
    setProducts(prev => page == 1 ? data.products : [...prev, ...data.products])
    setIsRefreshing(false)
    return data
  })

  const { colors } = useTheme()

  return (
    <VStack flex={1} bg="white">

      <HStack bg="white" py={2} w="full" pt={12} px={4}>
        <Pressable
          w="full"
          flexDirection="row"
          onPress={handleGoToSearch}>
          <Box
            flex={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            px={4}
            py={2}
            rounded="md"
            borderWidth={1}
            borderColor="white"
            bg="gray.50"
            shadow={9}
          >
            <Text color="purple.900">Pesquise aqui...</Text>
            <Icon as={<MagnifyingGlass color={colors.purple[900]} weight="bold"/>} />
          </Box>
        </Pressable>
      </HStack>

      <VStack
        flex={1}
        bg="gray.300">
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bg="gray.200"
          maxH={14}>
          {categories?.map(category => (
            <Pressable key={category.id} onPress={() => hanldeToggleCategory(category.name)}>
              <Box
                ml={2}>
                <HStack
                  alignItems="center"
                  h={14}
                  space={2}
                >
                  {category.slug && (<Center>
                    <Image size={30} alt={`imagem de ${category.slug}`} borderRadius={100} source={{
                      uri: category.slug
                    }} />
                  </Center>)}
                  <Text fontSize="md" fontWeight="bold">{category.name}</Text>
                </HStack>
              </Box>
            </Pressable>
          ))}
        </ScrollView>
        <VStack flex={1}>
         <MasonryList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }:any) => <BaseProduct data={item} />}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            onEndReached={refetch}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isLoading && <Spinner size="lg" color="purple.900" />}
            contentContainerStyle={{
              paddingBottom: 16,
            }}
          /> 
        </VStack>
      </VStack>
      <BottomNavigation route="cart"/>
    </VStack>
  );
}