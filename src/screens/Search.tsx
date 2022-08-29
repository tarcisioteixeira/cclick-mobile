import { useNavigation } from '@react-navigation/native';
import { HStack, Icon, IconButton, useTheme, VStack } from 'native-base';
import { MagnifyingGlass, CaretLeft } from 'phosphor-react-native';
import React from 'react';
import { BottomNavigation } from '../components/BottomNavigation';
import { TextField } from '../components/TextField';

export function Search() {

    const { colors } = useTheme()
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <VStack flex={1} bg="purple.800">

            <HStack 
            bg="purple.800" 
            py={4} 
            w="full" 
            pt={12} 
            px={4}
            justifyContent="space-between">
                <IconButton
                icon={
                    <Icon as={<CaretLeft color={colors.purple[100]}/>}/>
                }
                _pressed={{
                    bg: "purple.800"
                }}
                onPress={handleGoBack}/>
                <TextField 
                    flex="1"
                    h={14}
                    bg="purple.800"
                    rounded="md"
                    placeholder='pesquise aqui..'
                    placeholderTextColor="purple.100"
                    selectionColor="purple.100"
                    pl={2}
                    color="purple.200"
                    autoFocus={true}
                    _focus={{
                        bg: "purple.800"
                    }}
                    InputRightElement={
                    <IconButton
                        icon={
                            <Icon as={<MagnifyingGlass color={colors.purple[100]} />} />
                        }
                        _pressed={{
                            bg: "purple.800"
                        }} 
                    />}
                />
            </HStack>

            <VStack
                flex={1}
                bg="gray.50">

            </VStack>
            

        </VStack>
    );
}