import React from 'react';
import FloatingActionButton from '../../Components/Main/FloatingActionButton';
import { ic_add } from '../../Images/Images';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import ExpandableInput from '../../Components/NewOrder/ExpandableInput';

export default class MisPedidosScreen extends React.Component{
  static navigationOptions = {
    title:'Mis Pedidos'
  }

  onPressAdd(){
    this.props.navigation.navigate('AgregarPedido')
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>


        <SafeAreaView style={styles.floatingActionView}>
        <FloatingActionButton source={ic_add}
          onPress={this.onPressAdd.bind(this)}/>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  floatingActionView:{
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
});
