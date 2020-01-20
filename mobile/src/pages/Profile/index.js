import React from "react";
import { WebView } from "react-native-webview";
// import { Container } from './styles';

export default function Profile({ navigation }) {
  const username = navigation.getParam('username');
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `https://github.com/${username}` }}
    />
  );
}
