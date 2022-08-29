import React from 'react';
import { MotiView } from 'moti';
import { Text } from 'native-base';


export function Toast() {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: 'timing',
      }}
    >
        <Text>tarcio</Text>
    </MotiView>
  );
}