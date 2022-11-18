import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Center, Heading, HStack, Icon, IconButton, Text, Toast, useTheme, VStack } from 'native-base';
import { Envelope, Eye, EyeSlash, LockKey } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { useAuth } from '../context/auth';
import { useApi } from '../services/axios';

type IRouteParams = {
    redirectTo: string
}

type LoginParams = {
    login: string
    password: string
}

export function Signin() {

    const route = useRoute()
    const navigation = useNavigation()

    const { redirectTo } = route.params as IRouteParams

    const { colors } = useTheme()
    const [isShowingPassword, setIsShowingPassword] = useState(true)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handlePasswordShow = () => {
        setIsShowingPassword(!isShowingPassword)
    }

    const { setUserId } = useAuth()


    const handleSignin = async () => {

        try {
            setIsLoading(true)
            const { data } = await useApi.post('/auth', { login, password })
            setIsLoading(false)
            setUserId(data.userId)

            setTimeout(() => {
                navigation.navigate<any>(redirectTo)
            }, 10)
            return data
        } catch (error: any) {
            Toast.show({
                render: () => {
                    return (
                        <Box
                            bg="red.100"
                            py={2}
                            px={2}
                            borderLeftWidth={10}
                            borderLeftColor="red.600"
                            rounded="lg"
                            w="full"
                        >
                            <Text>Email ou senha invalidos</Text>
                        </Box>
                    )
                },
                placement: "top"
            })
            setIsLoading(false)
        }
    }

    return (
        <VStack flex={1} bg="white" px={4}>

            <Center flex={1} bg="white">
                <VStack  w="full" px="2">
                    <Heading color="purple.900">Login</Heading>
                    <Text color="purple.800" fontWeight="bold">Acesse a sua conta para continuar</Text>
                </VStack>
                <VStack w="full" py={8} px={2} rounded="md">
                    <TextField
                        placeholder="E-mail"
                        borderWidth={2}
                        borderColor="white"
                        shadow={9}
                        bg="gray.50"
                        color="gray.600"
                        placeholderTextColor="gray.400"
                        selectionColor="purple.900"
                        mb={1}
                        InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[400]} />} />}
                        _focus={{
                            borderWidth: 2,
                            borderColor: "purple.900",
                            bg: "gray.50"
                        }}
                        onChangeText={setLogin} />

                    <TextField
                        placeholder="password"
                        bg="gray.50"
                        borderWidth={2}
                        borderColor="white"
                        shadow={9}
                        color="gray.600"
                        placeholderTextColor="gray.400"
                        selectionColor="purple.900"
                        InputLeftElement={<Icon ml={4} as={<LockKey color={colors.gray[400]} />} />}
                        InputRightElement={
                            isShowingPassword ?
                                <IconButton
                                    onPress={handlePasswordShow}
                                    mr={4}
                                    icon={<Icon as={<Eye color={colors.gray[400]} />} />}
                                    _pressed={{ bg: "gray.50" }}
                                />
                                : <IconButton
                                    onPress={handlePasswordShow}
                                    mr={4}
                                    icon={<Icon as={
                                        <EyeSlash color={colors.gray[400]} />
                                    }
                                    />}
                                    _pressed={{ bg: "gray.50" }}
                                />
                        }
                        mb={4}
                        _focus={{
                            borderWidth: 2,
                            borderColor: "purple.900",
                            bg: "gray.50"
                        }}
                        onChangeText={setPassword}
                        secureTextEntry={isShowingPassword}
                    />

                    <Button
                        title="login"
                        w="full"
                        bg="purple.900"
                        color="purple.100"
                        isLoading={isLoading}
                        h={14}
                        _pressed={{
                            bg: "purple.800",
                        }}
                        onPress={handleSignin} />

                </VStack>
            </Center>
            <HStack py={8} space={3} justifyContent="center">
                <Text fontWeight="bold">não tem uma conta?</Text><Text fontWeight="bold" color="purple.800">Click aqui</Text>
            </HStack>
        </VStack>
    );
}