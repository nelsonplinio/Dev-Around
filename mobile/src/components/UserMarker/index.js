import React from 'react';
import { Marker, Callout } from "react-native-maps";

import {
  UserImage,
  MarkerBottomPointer,
  CalloutContainer,
  CalloutUserName,
  CalloutUserBio,
  CalloutUserTechs,
} from './styles';

export default function UserMarker({ user, isCurrentUser, calloutOnPress }) {
  return (
    <Marker
      coordinate={{
        longitude: user.location.coordinates[0],
        latitude: user.location.coordinates[1]
      }}
    >
      <>
        <UserImage isCurrentUser={isCurrentUser} source={{ uri: user.avatar_url }} />
        <MarkerBottomPointer isCurrentUser={isCurrentUser} />
      </>

      <Callout onPress={calloutOnPress}>
        <CalloutContainer>
          <CalloutUserName>{user.name}</CalloutUserName>
          <CalloutUserBio>{user.bio}</CalloutUserBio>
          <CalloutUserTechs>{user.techs.join(', ')}</CalloutUserTechs>
        </CalloutContainer>
      </Callout>
    </Marker>
  );
}
