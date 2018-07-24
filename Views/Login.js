import React from 'react';
import DataEntry from '../Components/Login/DataEntry';
import { SafeAreaView ,
   StyleSheet,
   Image,
   Text,
   Alert,
 TouchableOpacity} from 'react-native';
import { appLogo ,facebookLogo } from '../Images/Images'
import RoundImageButton from '../Components/Login/RoundImageButton'
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import {  setUserFromFirebase, setStrings , setOrderFromFirebase} from "../src/js/actions/ActionIndex";
import { connect } from 'react-redux';



class LoginScreen extends React.Component{
  // HEADER
  static navigationOptions = {
    title: '',
    headerStyle : {
      backgroundColor: '#4CAF50',

    },

  };
  //STATE
  state = {
    email: '',
    clave: '',
    errorMessage: null
  }
  handleSignIn = () => {
    this.props.navigation.navigate('SignIn');
  }
// FIREBASE SINGUP
  handleSignUp = () => {
    const { email , clave } = this.state;
        firebase
          .auth()
          .signInAndRetrieveDataWithEmailAndPassword(email, clave)
          .then((user) => {
            this.props.setStrings()
            this.props.getUserOrders(user.user.uid);
            this.props.getDatabaseUser(user.user.uid);
            this.props.navigation.navigate('MainStack')
          })
          .catch(error => this.setState({ errorMessage: error.message }, ()=>{
            Alert.alert(' ' + error.message);
          }));
  }
// GET DATA FROM COMPONENTS
  getEntryData(campo,text){
    this.setState({
      [campo]:text,
    });
  }

  saveInFirebase(user){
    firebase.database()
      .ref()
      .child('Usuarios')
      .child(user.uid)
      .set({
        clientData:{
          mail: user.email,
          nombreYApellido: user.displayName,
          telefono: this.state.telefono,
        }
      }).then( ()=>{
        this.props.navigation.navigate('MainStack');
      })
  }

  onPressFacebook = async () => {
    try {

    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);


    if (result.isCancelled) {
      Alert.alert('Hubo un problema, por favor intente de nuevo mas tarde')
      throw new Error('User cancelled request'); // Handle this however fits the flow of your app
    }
    // get the access token
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      Alert.alert('No data');
      throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
    }
    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    // login with credential
    const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then( (user) => {
        this.saveInFirebase(user);
        this.props.setStrings()
        this.props.getUserOrders(user.user.uid);
        this.props.getDatabaseUser(user.user.uid);
      });
  } catch (e) {
      Alert.alert(e.message);
    }
  }


// REDER
  render() {


    return(
      <SafeAreaView style={styles.container}>
        <Image
          source={appLogo}
          style={{width: '100%', height: '40%', resizeMode: 'contain'}}
          />

        <DataEntry
        placeholder={'Email'}
        getData={this.getEntryData.bind(this)}/>
        <DataEntry
        placeholder={'Clave'}
        secureTextEntry={true}
        getData={this.getEntryData.bind(this)}/>

        <TouchableOpacity style={styles.button}
          onPress={this.handleSignUp}>
          <Text style={{fontSize: 18, color: '#fff'}}>Acceder</Text>
        </TouchableOpacity>

        <RoundImageButton
        onPress={this.onPressFacebook.bind(this)}
        source={facebookLogo}/>

        <TouchableOpacity style={styles.signIn}
          onPress={this.handleSignIn}>
          <Text style={{fontSize: 18, color: '#fff'}}>Registrarse</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDatabaseUser: (firUId) => dispatch(setUserFromFirebase(dispatch,firUId)),
  getUserOrders: (firUid) => dispatch(setOrderFromFirebase(dispatch,firUid)),
  setStrings: () => dispatch(setStrings(dispatch)),
});

export default connect(null,mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  dataEntry:{
    marginTop: 10,
  },
  button:{
    borderRadius: 25,
    width: '45%',
    height: 45,
    marginTop: 20,
    backgroundColor: '#087F23',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signIn:{
    marginTop: 15,
  }
})
