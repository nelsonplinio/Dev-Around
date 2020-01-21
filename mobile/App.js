import React from "react";
import { StatusBar, YellowBox } from "react-native";
import Routes from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor="#7D40e7"
        barStyle="light-content"
        translucent={true}
      />
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </>
  );
}
