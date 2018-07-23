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

const Datos = createStackNavigator({
  Datos: {screen : MisPedidosScreen},
  AgregarPedido: {screen: AddNewOrderScreen,
      navigationOptions: ()=>({
          headerBackTitle:'Volver',
      }),
  }
},{
  initialRouteName:'Datos'
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
  initialRouteName: 'Raquetas',
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
  });
  // initialRouteName: 'Loading',
