import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import api from "../../services/api";

import {
  ScrollContainer,
  Container,
  ImageProfile,
  Name,
  UserName,
  TechsContainer,
  Techs,
  TechsName,
  MenuContainer,
  MenuItem,
  MenuItemIcon,
  MenuItemContainer,
  MenuItemTitle,
  MenuItemSubtitle,
  MenuItemIndicator,
  MenuItemTextContainer,
  MenuItemIconSocial
} from "./styles";

export default function MyProfile() {
  const insets = useSafeArea();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      const { data } = await api.get("/profiles");
      setTimeout(() => {
        setUser(data);
      }, 2000)
      
    } catch ({ response }) {
      Alert.alert("Ocorreu algo inesperado", response.data.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ScrollContainer>
      <Container insets={insets}>
        <ImageProfile
          isEmpty={user.avatar_url === undefined}
          source={{ uri: user.avatar_url }}
        />

        <Name isEmpty={user.name === undefined}>{user.name}</Name>

        <UserName isEmpty={user.username === undefined}>{user.username}</UserName>

        <TechsContainer>
          {user.techs &&
            user.techs.map(tech => (
              <Techs key={tech}>
                <TechsName>{tech}</TechsName>
              </Techs>
            ))}
        </TechsContainer>

        <MenuContainer>
          <MenuItem>
            <MenuItemContainer>
              <MenuItemIcon name="person-outline" />
              <MenuItemTextContainer>
                <MenuItemTitle>Perfil</MenuItemTitle>
                <MenuItemSubtitle>Editar meu perfil</MenuItemSubtitle>
              </MenuItemTextContainer>
              <MenuItemIndicator name="chevron-right" />
            </MenuItemContainer>
          </MenuItem>
          <MenuItem>
            <MenuItemContainer>
              <MenuItemIcon name="notifications-none" />
              <MenuItemTextContainer>
                <MenuItemTitle>Notificaçoes</MenuItemTitle>
                <MenuItemSubtitle>
                  Minha central de notificações
                </MenuItemSubtitle>
              </MenuItemTextContainer>
              <MenuItemIndicator name="chevron-right" />
            </MenuItemContainer>
          </MenuItem>
          <MenuItem>
            <MenuItemContainer>
              <MenuItemIcon name="people-outline" />
              <MenuItemTextContainer>
                <MenuItemTitle>Amigos</MenuItemTitle>
                <MenuItemSubtitle>Meus amigos</MenuItemSubtitle>
              </MenuItemTextContainer>
              <MenuItemIndicator name="chevron-right" />
            </MenuItemContainer>
          </MenuItem>
          <MenuItem>
            <MenuItemContainer>
              <MenuItemIcon name="today" />
              <MenuItemTextContainer>
                <MenuItemTitle>Agendamentos</MenuItemTitle>
                <MenuItemSubtitle>
                  Meus agendamentos em coworks
                </MenuItemSubtitle>
              </MenuItemTextContainer>
              <MenuItemIndicator name="chevron-right" />
            </MenuItemContainer>
          </MenuItem>
          <MenuItem>
            <MenuItemContainer>
              <MenuItemIcon name="favorite-border" />
              <MenuItemTextContainer>
                <MenuItemTitle>Favoritos</MenuItemTitle>
                <MenuItemSubtitle>Meus locais favoritos</MenuItemSubtitle>
              </MenuItemTextContainer>
              <MenuItemIndicator name="chevron-right" />
            </MenuItemContainer>
          </MenuItem>
        </MenuContainer>

        <MenuContainer>
          <MenuItem>
            <MenuItemContainer>
              <MenuItemIcon name="settings" secondary={true} />
              <MenuItemTextContainer>
                <MenuItemTitle secondary={true}>Configurações</MenuItemTitle>
              </MenuItemTextContainer>
              <MenuItemIndicator name="chevron-right" />
            </MenuItemContainer>
          </MenuItem>
          <MenuItem>
            <MenuItemContainer>
              <MenuItemIcon secondary={true} name="security" />
              <MenuItemTextContainer>
                <MenuItemTitle secondary={true}>Segurança</MenuItemTitle>
              </MenuItemTextContainer>
              <MenuItemIndicator name="chevron-right" />
            </MenuItemContainer>
          </MenuItem>
          <MenuItem>
            <MenuItemContainer>
              <MenuItemIcon />
              <MenuItemTextContainer>
                <MenuItemTitle secondary={true}>Sair</MenuItemTitle>
              </MenuItemTextContainer>
            </MenuItemContainer>
          </MenuItem>
        </MenuContainer>
      </Container>
    </ScrollContainer>
  );
}
