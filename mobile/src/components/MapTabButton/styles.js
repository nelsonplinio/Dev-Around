import styled from 'styled-components/native';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.TouchableWithoutFeedback`
 
  position: absolute;
`;

export const Background = styled(LinearGradient).attrs({
  start: [0.5, 0.3],
  end: [1, 1],
  colors: ["#7d40e7", "#a336dd", "#c12ad2", "#da1dc5", "#ee13b8"]
})`
 height: 80px;
  width: 80px;
  border-radius: 40px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  position: relative;
  top: -40px;
  border-color: #fff;
  border-width: 2px;
  elevation: 3;
  /* flex: 1; */
`;
export const Icon = styled(FontAwesome)`
  font-size: 28px;
  color: #fff;
`;