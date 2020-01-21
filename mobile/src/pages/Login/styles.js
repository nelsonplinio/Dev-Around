import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

import colors from "../../theme/colors";

const { width, height } = Dimensions.get("window");

export const Container = styled(LinearGradient).attrs({
  start: [0, 0],
  end: [1, 1],
  colors: ["#7d40e7", "#a336dd", "#c12ad2", "#da1dc5", "#ee13b8"]
})`
  flex: 1;
  align-items: center;
  padding-top: ${({ insets }) => insets.top + 16}px;
  padding-bottom: ${({ insets }) => insets.bottom + 16}px;
`;

export const Logo = styled(FontAwesome)`
  font-size: 160px;
  margin: 18px 0px;
  min-height: ${height * 0.2}px;
  color: ${colors.primaryText};
`;

export const FormContainer = styled.View`
  max-width: 450px;
  width: ${width * 0.9}px;
  margin: 16px;
  align-items: center;
  justify-content: space-between;
`;

export const FormTextInput = styled.TextInput`
  height: 55px;
  width: ${width * 0.9}px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin: 8px 0;
  padding: 8px 16px;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;

export const SignInButton = styled.TouchableOpacity`
  background: #fff;
  height: 60px;
  width: ${width * 0.6}px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin: 8px 0;
  elevation: 4;

  opacity: ${({ loading, disabled }) => {
    console.log(loading, disabled)
    if (disabled && !loading) {
      return 0.6;
    } else {
      return 1;
    }
  }};
`;

export const SignInButtonText = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 22px;
  letter-spacing: 5px;
  text-transform: uppercase;
  width: ${width * 0.6}px;
  text-align: center;
`;

export const SignUpButton = styled.TouchableOpacity`
  height: 45px;
  width: ${width * 0.4}px;
  align-items: center;
  justify-content: center;
`;

export const SignUpButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 5px;
`;

export const SignInIndicator = styled.ActivityIndicator.attrs({
  color: "#ee13b8",
  size: "large"
})``;
