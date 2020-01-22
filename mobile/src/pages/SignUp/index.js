import React, { useState } from "react";
import { Alert } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { Checkbox } from "react-native-paper";

import api from "../../services/api";

import {
  Container,
  FormContainer,
  FormTextInput,
  SignUpButton,
  SignUpButtonText,
  SignUpIndicator,
  SignUpButtonBackground,
  UseGithubCheckboxContainer,
  UseGithubCheckboxLabel,
  UseGithubCheckboxButton,
  FormTextInputTechs
} from "./styles";
export default function SignUp() {
  const insets = useSafeArea();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [techs, setTechs] = useState("");
  const [useGithubInfo, setUseGithubInfo] = useState(true);

  const [loading, setLoading] = useState(false);

  function formValid() {
    return username.length > 3 && password.length > 3 && techs.length > 0;
  }

  function cleanForm() {
    setUsername("");
    setPassword("");
    setTechs("");
    setUseGithubInfo(true);
  }

  async function handleSignUp() {
    try {
      setLoading(true);
      await api.post("/users", {
        techs,
        username,
        password,
        useGithubInfo
      });

      Alert.alert(
        "Registro com sucesso",
        `Registro realizado com sucesso. \nConta criado com o usuário "${username}".`
      );
      cleanForm();
    } catch ({ response }) {
      const { data } = response;

      Alert.alert("Registro falho", data.message);
    }
    setLoading(false);
  }

  return (
    <Container insets={insets}>
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

        <FormTextInputTechs
          placeholder="Tecnologias"
          value={techs}
          onChangeText={setTechs}
          autoCapitalize="words"
          multiline={true}
          
        />

        <UseGithubCheckboxButton
          onPress={() => setUseGithubInfo(!useGithubInfo)}
        >
          <UseGithubCheckboxContainer>
            <UseGithubCheckboxLabel>
              Usar dados do github
            </UseGithubCheckboxLabel>
            <Checkbox.Android
              color="#7d40e7"
              status={useGithubInfo ? "checked" : "unchecked"}
            />
          </UseGithubCheckboxContainer>
        </UseGithubCheckboxButton>

        <SignUpButton
          loading={loading}
          disabled={!formValid() || loading}
          onPress={handleSignUp}
        >
          <SignUpButtonBackground>
            {loading ? (
              <SignUpIndicator />
            ) : (
              <SignUpButtonText>Registrar</SignUpButtonText>
            )}
          </SignUpButtonBackground>
        </SignUpButton>
      </FormContainer>
    </Container>
  );
}
