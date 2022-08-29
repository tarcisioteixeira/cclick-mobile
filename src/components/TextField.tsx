import React from 'react';
import { Input, IInputProps } from 'native-base';

export function TextField({...rest}: IInputProps) {
  return (
    <Input
    h={14}
    size="md"
    fontSize="md"
    fontFamily="body"
    borderWidth={0}
    {...rest}/>
  ); 
}