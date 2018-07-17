import { createStackNavigator, createSwitchNavigator , createBottomTabNavigator} from 'react-navigation';
import LoginScreen from '../Views/Login';
import SignInScreen from '../Views/SignInScreen';
import LoadingUser from '../Views/LoadingUser';
import MisDatosScreen from '../Views/BottomBarViews/MisDatosScreen';
import MisRaquetasScreen from '../Views/BottomBarViews/MisRaquetasScreen';
import MisCuerdasScreen from '../Views/BottomBarViews/MisCuerdasScreen';
import HistorialEncordadosScreen from '../Views/BottomBarViews/HistorialEncordados';
import SettingsScreen from '../Views/BottomBarViews/SettingsScreen';
import BottomNavigation from '../Components/Main/BottomNavigation';
import AddNewOrderScreen from '../Views/AddNewOrder';






const Datos = createStackNavigator({
  Datos: {screen : MisDatosScreen},
  AgregarPedido: {screen: AddNewOrderScreen},
},{
  initialRouteName:'AgregarPedido'
});
const Raquetas = createStackNavigator({
  Raquetas: {screen: MisRaquetasScreen},
});
const Cuerdas = createStackNavigator({
  Cuerdas: {screen: MisCuerdasScreen}
});
const Historial = createStackNavigator({
  Historial: {screen: HistorialEncordadosScreen}
});
const Opciones = createStackNavigator({
  Opciones: {screen: SettingsScreen}
});


export const TabStackNavigation = createBottomTabNavigator({
  Pedidos: Datos,
  Cuerdas: Cuerdas,
  Raquetas: Raquetas,
  Historial: Historial,
  Opciones: Opciones,
},{
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
    initialRouteName: 'MainStack',
  });
  // initialRouteName: 'Loading',
