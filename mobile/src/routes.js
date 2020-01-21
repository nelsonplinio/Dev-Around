import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const appRoutes = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        title: "Dev Around"
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

const loginRoutes = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    }
  },
);

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
