import { createStackNavigator, createSwitchNavigator , createBottomTabNavigator} from 'react-navigation';
import LoginScreen from '../Views/Login';
import SignInScreen from '../Views/SignInScreen';
import LoadingUser from '../Views/LoadingUser';
import MisPedidosScreen from '../Views/BottomBarViews/MisPedidosScreen';
import MisRaquetasScreen from '../Views/BottomBarViews/MisRaquetasScreen';
import MisCuerdasScreen from '../Views/BottomBarViews/MisCuerdasScreen';
import HistorialEncordadosScreen from '../Views/BottomBarViews/HistorialEncordados';
import SettingsScreen from '../Views/BottomBarViews/SettingsScreen';
import BottomNavigation from '../Components/Main/BottomNavigation';
import AddNewOrderScreen from '../Views/AddNewOrder';
import { Colors } from '../src/Constants';

const navigationOptions = {
  headerStyle:{
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle:{color:Colors.white}
};

const Datos = createStackNavigator({
  Datos: {screen : MisPedidosScreen},
},{
  navigationOptions: navigationOptions
});
const Raquetas = createStackNavigator({
  Raquetas: {screen: MisRaquetasScreen},
},{
  navigationOptions: navigationOptions
});
const Cuerdas = createStackNavigator({
  Cuerdas: {screen: MisCuerdasScreen}
},{
  navigationOptions: navigationOptions
});
const Historial = createStackNavigator({
  Historial: {screen: HistorialEncordadosScreen}
},{
  navigationOptions: navigationOptions
});
const Opciones = createStackNavigator({
  Opciones: {screen: SettingsScreen}
},{
  navigationOptions: navigationOptions
});


export const TabStackNavigation = createBottomTabNavigator({
  Pedidos: Datos,
  Cuerdas: Cuerdas,
  Raquetas: Raquetas,
  Historial: Historial,
  Opciones: Opciones,
},{
  initialRouteName: 'Pedidos',
  tabBarComponent: BottomNavigation,
  tabBarPosition: 'bottom',
})

export default SwitchNavigation = createSwitchNavigator(
  {
      Loading: {screen: LoadingUser},
      Login: {screen: LoginScreen},
      SignIn: {screen: SignInScreen},
      MainStack: TabStackNavigation,
  },{
    initialRouteName: 'Loading',
    navigationOptions: {
      headerStyle:{
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: Colors.primaryColor,
    }
  });
