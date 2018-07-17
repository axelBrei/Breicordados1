import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  FlatList,
} from 'react-native';
import ExpandableInput from '../Components/NewOrder/ExpandableInput';
import ExpandableMenu from '../Components/NewOrder/ExpandableMenu';

export default class AddNewOrderScreen extends React.Component{
  static navigationOptions = {
    headerTitle: 'Nuevo Pedido',
  };

  state = {
    raquetas: [],
    orden:{
      raqueta: null,
    },
  };

  getText(text){
  }

  render () {
    return (
      <View style={styles.container}>

      <ExpandableMenu
        style={{margin:10}}
        title={'Raquetas'}>
        <Text style={styles.text}> HolaPedro </Text>
      </ExpandableMenu>

      <ExpandableInput
      placeholder={'Raqueta'}
      getText={this.getText.bind(this)}/>
      <ExpandableInput
      placeholder={'Tension'}
      getText={this.getText.bind(this)}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  text:{
    fontSize: 12,
  }
})
