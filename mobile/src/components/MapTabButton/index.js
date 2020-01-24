import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text } from 'react-native';

import {
  Container,
  Icon,
  Background
} from './styles';

function MapTabButton({route, navigation, focused}) {
  function handleNav() {
    const {routeName} = route;
    navigation.navigate(routeName);
  }
  return (
    <Container onPress={handleNav}>
      <Background >
      <Icon name={focused ? 'map' : 'map-o'}/>
      </Background>
    </Container>
  );
}

export default withNavigation(MapTabButton)