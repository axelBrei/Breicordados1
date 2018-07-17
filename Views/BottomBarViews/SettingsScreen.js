import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import SwitchNavigation from '../../StackNavigation/MainStack';
import firebase from 'react-native-firebase';



export default class SettingsScreen extends React.Component{

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.singOut}
          onPress={()=> {
            firebase.auth().signOut()
            this.props.navigation.navigate('Login');

          }}>
          <View>
            <Text>Salir</Text>
          </View>
          </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  singOut:{
    borderRadius: 20,
    backgroundColor: 'green',
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
})
