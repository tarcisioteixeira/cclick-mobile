import React from 'react';
import { VStack, Text } from 'native-base';
import { BottomNavigation } from '../components/BottomNavigation';


export function Order() {
  return (
    <VStack>
        <Text>Order</Text>
        <BottomNavigation/>
    </VStack>
  );
}