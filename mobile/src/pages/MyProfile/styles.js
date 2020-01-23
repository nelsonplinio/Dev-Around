import styled from "styled-components/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import colors from "../../theme/colors";

export const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})``;

export const Container = styled.View`
  padding: ${({ insets }) => {
    return `${insets.top + 22}px 16px 0 16px`;
  }};
  flex: 1;
`;

export const ImageProfile = styled.Image`
  height: 125px;
  width: 125px;
  border-radius: 75px;
  align-self: center;
  padding-bottom: 16px;
  background: ${({isEmpty}) => isEmpty ? "#f0f0f0": "transparent"};
`;

export const Name = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 30px;
  margin: 8px 8px 0 8px;
  min-width: 180px;
  text-align: center;
  margin-bottom: 4px;
  border-radius: 16px;
  background: ${({isEmpty}) => isEmpty ? "#f0f0f0": "transparent"};
`;

export const UserName = styled.Text`
  align-self: center;
  font-size: 18px;
  color: #666;
  font-weight: bold;
  min-width: 100px;
  text-align: center;
  border-radius: 8px;
  background: ${({isEmpty}) => isEmpty ? "#f0f0f0": "transparent"};
`;

export const TechsContainer = styled.View`
  min-height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 16px 0;
`;

export const Techs = styled.View`
  /* background: ${colors.primary}; */
  background: rgba(125, 64, 231, 0.3);

  padding: 8px 16px;
  border-radius: 60px;
`;

export const TechsName = styled.Text`
  font-weight: bold;
  color: rgb(125, 64, 231);
  font-size: 16px;
`;

export const MenuContainer = styled.View`
  margin-bottom: 28px;
`;

export const MenuItem = styled.TouchableWithoutFeedback`
  margin: 4px 0;
`;

export const MenuItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  /* background: red; */
  min-height: 60px;
  padding: 8px 0;
`;

export const MenuItemIcon = styled(MaterialIcons)`
  font-size: 32px;
  margin-right: 16px;
  min-width: 32px;
  color: ${({ secondary }) => (secondary ? "#444" : "#000")};
`;

export const MenuItemTextContainer = styled.View`
  flex: 1;
`;

export const MenuItemTitle = styled.Text`
  font-weight: 600;
  font-size: 20px;
  color: ${({ secondary }) => (secondary ? "#444" : "#000")};
`;

export const MenuItemSubtitle = styled.Text`
  font-weight: 600;
  font-size: 17px;
  color: #999;
`;

export const MenuItemIndicator = styled(MaterialIcons)`
  font-size: 26px;
  color: #999;
`;