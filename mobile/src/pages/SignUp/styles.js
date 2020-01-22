import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

import colors from "../../theme/colors";

const { width, height } = Dimensions.get("window");

export const Container = styled.ScrollView`
  flex: 1;
  /* justify-content: center; */
  padding-top: 16px;
  padding-bottom: 16px;
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

// export const SignInButton = styled.TouchableOpacity`
//   background: #fff;
//   height: 60px;
//   width: ${width * 0.6}px;
//   align-items: center;
//   justify-content: center;
//   border-radius: 30px;
//   margin: 8px 0;

// `;

// export const SignInButtonText = styled.Text`
//   color: #7d40e7;
//   font-weight: bold;
//   font-size: 22px;
//   letter-spacing: 5px;
//   text-transform: uppercase;
//   width: ${width * 0.6}px;
//   text-align: center;
// `;

export const SignUpButtonBackground = styled(LinearGradient).attrs({
  start: [0, 0],
  end: [1, 1],
  colors: ["#7d40e7", "#a336dd", "#c12ad2", "#da1dc5", "#ee13b8"]
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: ${width * 0.8}px;
`;

export const SignUpButton = styled.TouchableOpacity`
  height: 60px;
  width: ${width * 0.8}px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 30px;
  flex-direction: column;
  elevation: 4;

  opacity: ${({ loading, disabled }) => {
    if (disabled && !loading) {
      return 0.6;
    } else {
      return 1;
    }
  }};
`;

export const SignUpButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 5px;
`;

export const SignUpIndicator = styled.ActivityIndicator.attrs({
  color: "#fff",
  size: "large"
})``;

export const UseGithubCheckboxButton = styled.TouchableWithoutFeedback`
  width: ${width * 0.9}px;
  height: 35px;
  align-items: center;
`;

export const UseGithubCheckboxContainer = styled.View`
  flex-direction: row;
  width: ${width * 0.9}px;
  justify-content: space-between;
  padding-left: 16px;
  align-items: center;
  margin-bottom: 12px;
`;
export const UseGithubCheckboxLabel = styled.Text`
  color: #7d40e7;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 5px;
`;

export const FormTextInputTechs = styled.TextInput`
  min-height: 70px;
  max-height: 120px;
  width: ${width * 0.9}px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin: 8px 0;
  padding: 8px 16px;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;
