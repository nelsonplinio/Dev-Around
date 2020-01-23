import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
// import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Map from "./pages/Map";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// const appRoutes = createStackNavigator(
//   {
//     Main: {
//       screen: Main,
//       navigationOptions: {
//         title: "Dev Around"
//       }
//     },
//     Profile: {
//       screen: Profile,
//       navigationOptions: {
//         title: "Perfil"
//       }
//     }
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: "#7D40e7"
//       },
//       headerTintColor: "#fff"
//     }
//   }
// );

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
      screen: Map,
      navigationOptions: {
        title: "Mapa",
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesome
            name={focused ? "map" : `map-o`}
            size={24}
            color={tintColor}
          />
        )
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
    tabBarOptions: {
      activeTintColor: "#7D40e7",
      allowFontScaling: true,
      labelStyle: {
        fontWeight: "bold"
      },
      keyboardHidesTabBar: true
    }
  }
);

function getTabIcon({ name, focused, tintColor }) {
  return (
    <FontAwesome
      name={focused ? name : `${name}-o`}
      size={24}
      color={tintColor}
    />
  );
}

const loginRoutes = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
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
