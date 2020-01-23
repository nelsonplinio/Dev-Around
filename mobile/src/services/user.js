import { AsyncStorage } from "react-native";

export async function saveAccessToken(token) {
  await AsyncStorage.setItem("access_token", token);
}
export async function getAccessToken() {
  return await AsyncStorage.getItem("access_token");
}
export async function removeAccessToken() {
  await AsyncStorage.removeItem("access_token");
}
