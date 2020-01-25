import React, { useState, useEffect } from "react";
import { useSafeArea } from 'react-native-safe-area-context';

import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";

import api from "./../../services/api";
import UserMarker from '../../components/UserMarker';
import { connect, subscribeToNewUser, disconnect } from "../../services/socket";

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState("");
  const [currentRegion, setCurrentRegion] = useState(null);
  const [user, setUser] = useState(null);
  const [curUserPosition, setCurUserPosition] = useState({})
  const [watchId, setWatchId] = useState(0);
  const insets = useSafeArea();

  useEffect(() => {
    async function loadUser() {
      startWachtPosition();
      const response = await api.get('/profiles');
      console.log(response.data);
      setUser(response.data);

      return () => navigator.geolocation.clearWatch(watchId);
    }
    loadUser();
  }, [])

  function startWachtPosition() {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        console.log(coords)
        const { longitude, latitude } = coords;
        setCurUserPosition({ latitude, longitude });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, }
    );

    setWatchId(watchId);
  }

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
        setDevs(data.filter(dev => dev._id !== user._id));
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

  function showMyPosition() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log(coords)
        const { longitude, latitude } = coords;
        setCurrentRegion({
          latitude,
          longitude
        });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, }
    );

  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          ...currentRegion,
          latitudeDelta: 0.0068,
          longitudeDelta: 0.0068
        }}
        region={{
          ...currentRegion,
          latitudeDelta: 0.0068,
          longitudeDelta: 0.0068
        }}
        onRegionChangeComplete={handleRegionChange}
      >
        {
          user && (
            <UserMarker isCurrentUser={true}
              calloutOnPress={() => handleGoToProfile(user.username)}
              user={{
                ...user,
                location: {
                  coordinates: [curUserPosition.longitude, curUserPosition.latitude]
                }
              }}
            />
          )
        }

        {devs.map(dev => <UserMarker user={dev} calloutOnPress={() => handleGoToProfile(dev.username)} />)}
      </MapView>

      <View insets={insets} style={[styles.searchContainer, { marginTop: insets.top + 8 }]}>
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
          <MaterialIcons name="search" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.myLocationButton}
        onPress={() => showMyPosition()}>
        <MaterialIcons name='my-location' size={25} color="#fff" />
      </TouchableOpacity>
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
  },
  myLocationButton: {
    marginStart: 8,
    backgroundColor: "#7D40e7",
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 16,
    right: 16,
  }
});
