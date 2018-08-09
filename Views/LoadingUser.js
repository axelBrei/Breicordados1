import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { appLogo } from '../Images/Images';
import firebase from 'react-native-firebase';
import {  setUserFromFirebase, setStrings , setOrderFromFirebase} from "../src/js/actions/ActionIndex";
import { connect } from 'react-redux';
import { Colors } from '../src/Constants';

class LoadingUser extends React.Component{
  constructor() {
    super();
    this.unsubscriber = null;

  }

  componentDidMount(){
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.props.setStrings()
      if(user){
        Promise.all([
          this.props.getUserOrders(user.uid),
          this.props.getDatabaseUser(user.uid)
        ]).then( () => this.props.navigation.navigate('MainStack'))
          
        
      }else{
        this.props.navigation.navigate('Login');
      }
    });
  };

componentWillUnmount(){
  if (this.unsubscriber) {
    this.unsubscriber();
  }

}

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <Image
        source={appLogo}
        style={{width: '100%', height: '40%', resizeMode: 'contain', marginBottom: 50}}
        />

        <ActivityIndicator 
          animating={true}
          color={Colors.black}
          size={'large'}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primaryColor
  },
})

const mapDispatchToProps = (dispatch) => ({
    getDatabaseUser: (firUId) => dispatch(setUserFromFirebase(dispatch,firUId)),
    getUserOrders: (firUid) => dispatch(setOrderFromFirebase(dispatch,firUid)),
    setStrings: () => dispatch(setStrings(dispatch)),
});
const mapStateToProps = ({raquetas}) => ({
    raquetas: raquetas
});

export default connect(mapStateToProps,mapDispatchToProps)(LoadingUser);
