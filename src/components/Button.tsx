import React from 'react';
import { Button as ButtonNativeBase , IButtonProps, Heading, Spinner, HStack } from 'native-base';
import { isLoading } from 'expo-font';

type props = IButtonProps & {
    title: string;
    isLoading?: boolean;
    color?: string;
    icon?: string;
}
export function Button({title, isLoading, color,icon,...rest}: props) {
  return (
    <ButtonNativeBase
    {...rest}>
      <HStack space={2}>
        {isLoading && (<Spinner color={color} ml={2}/>)}
        <Heading color={color} fontSize="md">{title}</Heading>

      </HStack>
    </ButtonNativeBase>
  );
}