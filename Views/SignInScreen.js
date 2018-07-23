import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { appLogo } from '../Images/Images';
import DataEntry from '../Components/Login/DataEntry';
import firebase from 'react-native-firebase';

export default class SignInScreen extends React.Component{

  state = {
    mail:'',
    nombre:'',
    telefono:'',
    clave:'',
    errorMessage: null,
  }


  getData(campo, text){
    this.setState({
      [campo]: text,
    });
  }

  saveInFirebase(user){
    const redirect = function() {
      this.props.navigation.navigate('MainStack');
    }

    firebase.database()
      .ref()
      .child('Usuarios')
      .child(user.user.uid)
      .set({
        clientData:{
          id:user.user.uid,
          mail: this.state.mail,
          nombreYApellido: this.state.nombre,
          telefono: this.state.telefono,
        }
      }).then(redirect.bind(this))
  }



  handleSignUp = ()=> {
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(this.state.mail, this.state.clave)
      .then((user) => {
        this.saveInFirebase(user);
      })
      .catch(error => {
        Alert.alert(error.message + ' ');
        this.setState({ errorMessage: error.message })
      })

  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <Image
        source={appLogo}
        style={{width: '100%', height: '40%', resizeMode: 'contain',marginBottom: 40}}
        />
        <DataEntry
          style={styles.entries}
          placeholder={'Mail'}
          getData={this.getData.bind(this)}/>
        <DataEntry
          style={styles.entries}
          placeholder={'Nombre'}
          getData={this.getData.bind(this)}/>
        <DataEntry
          style={styles.entries}
          placeholder={'Telefono'}
          getData={this.getData.bind(this)}/>
        <DataEntry
          style={styles.entries}
          placeholder={'Clave'}
          secureTextEntry={true}
          getData={this.getData.bind(this)}/>

        <TouchableOpacity style={styles.registerButton}
        onPress={this.handleSignUp}>
          <SafeAreaView>
            <Text style={styles.text}>Registrarse</Text>
          </SafeAreaView>
        </TouchableOpacity>


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  registerButton:{
    borderRadius: 25,
    width: '45%',
    height: 45,
    marginTop: 20,
    backgroundColor: '#087F23',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 18,
    color: '#fff',
  },
})
