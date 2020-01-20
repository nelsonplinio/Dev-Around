import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

import api from "./../../services/api";
import { connect, subscribeToNewUser, disconnect } from "../../services/socket";

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState("");
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadingInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadingInitialPosition();
  }, []);

  useEffect(() => {
    subscribeToNewUser(dev => {
      console.log('subscribeToNewUser.on', dev)
      setDevs([...devs, dev])
    })
  }, [devs])
  
  function setupWebsocket() {
    disconnect();
    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
  }
  
  async function loadDevs() {
    try {
      const { latitude, longitude } = currentRegion;

      const { data } = await api.get("/search", {
        params: {
          latitude,
          longitude,
          techs
        }
      });

      if (data) {
        setDevs(data);
      }

      setupWebsocket();
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  }

  function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  function handleGoToProfile(username) {
    navigation.navigate("Profile", { username });
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChange}
      >
        <Marker
          coordinate={{
            // ...currentRegion
            latitude: -16.706828,
            longitude: -49.3308677
          }}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: "https://avatars3.githubusercontent.com/u/14140891?s=460&v=4"
            }}
          />
          <Callout onPress={handleGoToProfile}>
            <View style={styles.callout}>
              <Text style={styles.userName}>Nelson Plínio</Text>
              <Text style={styles.bio}>OI Meu nome e nelson sou foda</Text>
              <Text style={styles.techs}>ReactJs, React Native, nodeJson </Text>
            </View>
          </Callout>
        </Marker>

        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1]
            }}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: dev.avatar_url
              }}
            />
            <Callout onPress={() => handleGoToProfile(dev.username)}>
              <View style={styles.callout}>
                <Text style={styles.userName}>{dev.name}</Text>
                <Text style={styles.bio}>{dev.bio}</Text>
                <Text style={styles.techs}>{dev.techs.join(",")}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por tech..."
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={setTechs}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => loadDevs()}
        >
          <MaterialIcons name="my-location" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    height: 55,
    width: 55,
    borderRadius: 27,
    borderWidth: 4,
    borderColor: "#fff"
  },
  callout: {
    width: 260
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16
  },
  bio: {
    color: "#666",
    marginTop: 5
  },
  techs: {
    marginTop: 5
  },
  searchContainer: {
    position: "absolute",
    top: 8,
    flexDirection: "row",
    marginHorizontal: 8
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    elevation: 3,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 16
  },

  searchButton: {
    marginStart: 8,
    backgroundColor: "#7D40e7",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  }
});
