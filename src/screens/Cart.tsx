import React from 'react';
import { VStack, Text } from 'native-base';
import { BottomNavigation } from '../components/BottomNavigation';


export function Cart() {
  return (
    <VStack>
        <Text>Cart</Text>
        <BottomNavigation/>
    </VStack>
  );
}