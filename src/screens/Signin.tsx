import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Center, Heading, Icon, IconButton, Text, Toast, useTheme, VStack } from 'native-base';
import { Envelope, Eye, EyeSlash, LockKey } from 'phosphor-react-native';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
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

            setTimeout(()=> {
                navigation.navigate<any>(redirectTo)
            },10)
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
        <VStack flex={1} bg="purple.900" px={4}>
            <Center flex={1} bg="purple.900">
                <Heading color="purple.100">Acesse a sua conta</Heading>
                <VStack w="full" py={8} px={2} rounded="md">
                    <TextField
                        placeholder="E-mail"
                        bg="purple.800"
                        color="white"
                        placeholderTextColor="gray.400"
                        selectionColor="purple.100"
                        mb={1}
                        InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[400]} />} />}
                        _focus={{
                            borderWidth: 2,
                            borderColor: "purple.600",
                            bg: "purple.900"
                        }}
                        onChangeText={setLogin} />

                    <TextField
                        placeholder="password"
                        bg="purple.800"
                        color="white"
                        placeholderTextColor="gray.400"
                        selectionColor="purple.100"
                        InputLeftElement={<Icon ml={4} as={<LockKey color={colors.gray[400]} />} />}
                        InputRightElement={
                            isShowingPassword ?
                                <IconButton
                                    onPress={handlePasswordShow}
                                    mr={4}
                                    icon={<Icon as={<Eye color={colors.gray[400]} />} />}
                                    _pressed={{ bg: "purple.900" }}
                                />
                                : <IconButton
                                    onPress={handlePasswordShow}
                                    mr={4}
                                    icon={<Icon as={
                                        <EyeSlash color={colors.gray[400]} />
                                    }
                                    />}
                                    _pressed={{ bg: "purple.900" }}
                                />
                        }
                        mb={4}
                        _focus={{
                            borderWidth: 2,
                            borderColor: "purple.600",
                            bg: "purple.900"
                        }}
                        onChangeText={setPassword}
                        secureTextEntry={isShowingPassword}
                    />

                    <Button
                        title="login"
                        w="full"
                        bg="purple.900"
                        borderWidth={2}
                        borderColor="purple.600"
                        color="purple.100"
                        isLoading={isLoading}
                        h={14}
                        _pressed={{
                            bg: "purple.800",
                        }}
                        onPress={handleSignin} />

                </VStack>
            </Center>
        </VStack>
    );
}