import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

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
      headerTintColor: "#fff",
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
