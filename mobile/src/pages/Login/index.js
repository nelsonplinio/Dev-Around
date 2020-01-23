import React, { useState, useEffect } from "react";
import { AsyncStorage, Alert } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import api, { setAccessToken } from "../../services/api";
import { saveAccessToken, getAccessToken as getAccessTokenSaved } from "../../services/user";

import {
  Container,
  Logo,
  FormContainer,
  FormTextInput,
  SignInButton,
  SignUpButton,
  SignInButtonText,
  SignUpButtonText,
  SignInIndicator
} from "./styles";

export default function Login({ navigation }) {
  const insets = useSafeArea();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAccessToken() {
      const accessToken = await getAccessTokenSaved();

      if (accessToken) {
        navigateToMain(accessToken);
      }
    }

    getAccessToken();
  }, []);

  function formValid() {
    return username.length > 3 && password.length > 3;
  }

  async function handleSignIn() {
    try {
      setLoading(true);
      const { data } = await api.post("/sessions", {
        username,
        password
      });
      saveAccessToken(data.token);
      navigateToMain(data.token);
    } catch ({ response }) {
      Alert.alert("Falha no login", response.data.message);
    }
    setLoading(false);
  }

  function handleSignUp() {
    navigation.navigate("SignUp");
  }

  async function navigateToMain(accessToken) {
    setAccessToken(accessToken);
    navigation.navigate("appRoutes", { accessToken });
  }

  return (
    <Container insets={insets}>
      <Logo name="connectdevelop" />
      <FormContainer>
        <FormTextInput
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          returnKeyType="next"
          enablesReturnKeyAutomatically
        />
        <FormTextInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <SignInButton
          loading={loading}
          disabled={!formValid() || loading}
          onPress={handleSignIn}
        >
          {loading ? (
            <SignInIndicator />
          ) : (
            <SignInButtonText>Entrar</SignInButtonText>
          )}
        </SignInButton>
        <SignUpButton onPress={handleSignUp}>
          <SignUpButtonText>Registre-se</SignUpButtonText>
        </SignUpButton>
      </FormContainer>
    </Container>
  );
}
