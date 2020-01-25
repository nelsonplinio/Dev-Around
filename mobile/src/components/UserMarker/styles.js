import styled from 'styled-components/native';

export const MarkerContainer = styled.View`
  height: 50px;
  width: 50px;
`;

export const UserImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-color: ${
  ({ isCurrentUser }) => (isCurrentUser ? '#7159c1' : '#999')
  };
  background: ${
  ({ isCurrentUser }) => (isCurrentUser ? '#7159c1' : '#999')
  };
  border-style: solid;
  border-width: 3px;
  z-index: 10;
`;

export const MarkerBottomPointer = styled.View`
  background: ${
  ({ isCurrentUser }) => (isCurrentUser ? '#7159c1' : '#999')
  };
  height: 38px;
  width: 40px;
  position: relative;
  top: -33px;
  right: -9px;
  transform: rotate(45deg);
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 16px;
`;

export const CalloutContainer = styled.View`
  min-width: 300px;
  max-width: 550px;
`;

export const CalloutUserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #333;
`;

export const CalloutUserBio = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #666;
`;

export const CalloutUserTechs = styled.Text`
  font-size: 14px;
  color: #333;  
`;