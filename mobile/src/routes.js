import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
  createStackNavigator(
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
  )
);

export default Routes;
