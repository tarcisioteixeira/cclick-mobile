import { useNavigation } from '@react-navigation/native';
import {
  Badge,
  Box, Button, Center, Divider, Flex, Heading,
  HStack,
  Icon,
  IconButton,
  Image, Modal, Pressable,
  ScrollView, Select, Text,
  useTheme, VStack
} from 'native-base';
import { CaretLeft, Minus, Plus, ShoppingCartSimple, Trash } from 'phosphor-react-native';
import React, { useState } from 'react';
import { TextField } from '../components/TextField';
import { useCart } from '../hooks/usecart';

interface ICart {
  id: string;
  qty: number;
  unity: string;
  name: string;
  price: number;
  avatarUrl: string;
}

export function Cart() {

  const navigation = useNavigation()
  const [qty, setQty] = useState(0)
  const [unity, setUnity] = useState('unidade(s)')
  const [productToUpadate, setProductToUpdate] = useState<ICart>()

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleUpdateCart = (cart) => {
    const product = {
      ...productToUpadate,
      qty,
      unity
    }

    updateCart(product, 'replace')
    setModalIsVisible(false)
  }

  const handleDisplayModal = (cart) => {
    setQty(cart.qty)
    setUnity(cart.unity)
    setProductToUpdate(cart)
    setModalIsVisible(true)
  }

  const { cartItems, removeFromCart, updateCart } = useCart()
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const { colors } = useTheme()

  const total = cartItems?.reduce((sumtotal, cart) => {
    sumtotal += cart.price * cart.qty
    return sumtotal
  }, 0)

  const handleGoToOrder = () => {
    navigation.navigate('order', { total })
  }


  return (
    <VStack flex={1} bg="white">

      <HStack pt={12} pb={2} justifyContent="space-between" alignItems="center" bg="white" px={4}>
        <HStack space={1} alignItems="center">
          <IconButton
            onPress={handleGoBack}
            _pressed={{
              bg: "gray.200"
            }}
            icon={<Icon as={<CaretLeft color={colors.purple[900]} weight='bold' />} />} />
          <Heading color="purple.900" fontSize={20}>your cart</Heading>
        </HStack>
        <Box>

          {cartItems?.length > 0 && (
            <Badge colorScheme="error" alignSelf="center" rounded="full" mb={-1}>
              {cartItems.length}
            </Badge>
          )}
          <ShoppingCartSimple color={colors.purple[900]} weight='bold'/>

        </Box>
      </HStack>


      <VStack
        flex={1}
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        shadow={9}
        bg="gray.300">

        <Box flex={1}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingVertical: 16
            }}
            showsVerticalScrollIndicator={false}>
            {cartItems?.map(cart => (


              <Box
                key={cart.id}
                rounded="sm"
                shadow={8}
                mt="1"
                bg="white">
                <HStack>
                  <Center bg="gray.100">

                    <Image
                      size={100}
                      resizeMode='cover'
                      alt={`imagem de ${cart?.name}`}
                      rounded="md"
                      source={{
                        uri: cart?.avatarUrl
                      }} />

                  </Center>
                  <VStack px="4" py="4" flex={1}>
                    <Text>{cart.name}</Text>

                    <HStack space={2}>
                      <IconButton
                        _pressed={{
                          bg: "purple.100"
                        }}
                        onPress={() => updateCart(cart, 'increase')}
                        icon={<Icon as={<Plus color={colors.red[600]} weight='bold' size="16" />} />} />

                      <Pressable
                        bg="gray.100"
                        shadow={9}
                        rounded="full"
                        justifyContent="center"
                        alignItems="center"
                        h="8"
                        w="8"
                        _pressed={{
                          bg: "gray.200"
                        }}
                        onPress={() => handleDisplayModal(cart)}>
                        <Text >{cart.qty}</Text>
                      </Pressable>

                      <IconButton
                        _pressed={{
                          bg: "purple.100"
                        }}
                        onPress={() => updateCart(cart, 'decrease')}
                        icon={<Icon as={<Minus color={colors.red[600]} weight='bold' size="16" />} />} />
                    </HStack>

                  </VStack>
                  <VStack py="4" px="4" position="relative">
                    <Text fontWeight='semibold' fontSize='lg'>{(cart.price * cart.qty)}</Text>
                    <IconButton
                      position="absolute"
                      bottom={-3}
                      shadow={9}
                      bg="gray.200"
                      rounded="full"
                      right={-5}
                      onPress={() => removeFromCart(cart.id)}
                      _pressed={{
                        bg: "gray.200"
                      }}
                      icon={<Icon as={<Trash color={colors.red[600]} weight='bold' size="16" />} />} />
                  </VStack>
                </HStack>
              </Box>



            ))}
          </ScrollView>
        </Box>
        <Box 
        bg="white" 
        h="1/5" 
        borderTopLeftRadius={20} 
        borderTopRightRadius={20} 
        shadow={9} 
        px="4" 
        pt="4">
          <VStack justifyContent="center" alignItems="center">
            <HStack space={3} justifyContent="center" alignItems="center">
              <Text fontSize={18}>Total</Text>
              <Text
                fontSize={20}
                color="purple.800"
                rounded="3xl"
                bg="gray.100"
                px="4"
                py="2"
              >{total}</Text>
            </HStack>

            <Divider bg="gray.200" my="1" />

            <Button
              w="1/2"
              bg="purple.800"
              _pressed={{
                bg: "purple.700"
              }}
              onPress={handleGoToOrder}>
              <Text color="white">Finalizar</Text>
            </Button>

          </VStack>
        </Box>
      </VStack>

      <Modal isOpen={modalIsVisible} onClose={() => setModalIsVisible(false)} >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body flex={1}>
            
              <Box
                mt="8"
                py="4"
                >

                <HStack>
                  <TextField
                    flex={1}
                    borderColor="gray.200"
                    borderWidth={1}
                    h={12}
                    placeholderTextColor="purple.900"
                    selectionColor="purple.100"
                    bg="gray.50"
                    keyboardType='number-pad'
                    autoFocus={true}
                    value={String(qty)}
                    onChangeText={(e) => setQty(Number(e))} />
                  <Select minWidth="170" accessibilityLabel="unidades" placeholder="unidades" onValueChange={setUnity}>
                    <Select.Item label="unidades" value="ux" />
                    <Select.Item label="Toneladas" value="ux" />
                    <Select.Item label="Caixas" value="ux" />
                  </Select>
                </HStack>
                <VStack
              
                  mt={1}>
                  <Button
                    bg="purple.700"
                    _pressed={{
                      bg: "purple.900",
                    }}
                    onPress={handleUpdateCart}>
                    <HStack
                      space={2}
                      alignItems="center">
                      <Text color="gray.50">
                        update
                      </Text>
                      <ShoppingCartSimple color={colors.gray[50]} />
                    </HStack>
                  </Button>
                </VStack>


              </Box>
            
          </Modal.Body>
        </Modal.Content>



      </Modal>
    </VStack >
  );
}