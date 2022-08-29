import React from 'react';
import { Center, Spinner } from 'native-base';

export function Loading() {
  return (
    <Center flex={1} bg="primary.900">
        <Spinner color="primary.50"/>
    </Center>
  );
}