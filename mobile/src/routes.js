import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Map from "./pages/Map";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import MapTabButton from './components/MapTabButton';

const mapRoutes = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        title: "Dev Around",
        header: () => null,
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Perfil"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#7D40e7"
      },
      headerTintColor: "#fff"
    }
  }
);

const appRoutes = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <MaterialCommunityIcons
            name={focused ? "home-variant" : "home-variant-outline"}
            color={tintColor}
            size={24}
          />
        )
      }
    },
    Map: {
      screen: mapRoutes,
      navigationOptions: {
        title: "Mapa",
        tabBarButtonComponent: (props) => (
          <MapTabButton {...props} />
        ),
      }
    },
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        title: "Perfíl",
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesome
            name={focused ? "user" : `user-o`}
            size={24}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'Map',
    tabBarOptions: {
      activeTintColor: "#7D40e7",
      allowFontScaling: true,
      labelStyle: {
        fontWeight: "bold"
      },
      style: {
        borderTopColor: '#f0f0f0',
        elevation: 4,
      },
      keyboardHidesTabBar: true,
    }
  }
);

const loginRoutes = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: () => null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Registro",
      headerTitleStyle: {
        minWidth: 150
      },
      headerStyle: {
        backgroundColor: "#7D40e7"
      },
      headerTintColor: "#fff"
    }
  }
});

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      loginRoutes,
      appRoutes
    },
    {
      initialRouteName: "loginRoutes"
    }
  )
);

export default Routes;
