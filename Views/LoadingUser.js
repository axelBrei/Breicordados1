import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
    Alert
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { appLogo } from '../Images/Images';
import firebase from 'react-native-firebase';
import {  setUserFromFirebase, setStrings } from "../src/js/actions/ActionIndex";
import { connect } from 'react-redux';

class LoadingUser extends React.Component{
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
      progress: 0,
      isLoading: true,
    };
  }

  componentDidMount(){
    this.setState({isLoading:true});
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.props.setStrings()
      if(user){
        this.props.getDatabaseUser(user.uid);
      }
      setInterval( ()=>{
        if (this.state.isLoading){
            this.setState({isLoading:false},()=>{
                this.props.navigation.navigate(user ? 'MainStack':'Login');
            });
        }
      }, 2300);
    });
    if (this.state.isLoading) {
      setInterval( () => {
        this.setState({
          progress: this.state.progress + 25,
        })
      },500);
    }
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

        <ProgressBarAnimated
          width={150}
          value={this.state.progress}
          backgroundColor={'#087F23'}
          onComplete={ () => {
            this.setState({
              progress: 0,
            })
          }}
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
    backgroundColor: '#4CAF50'
  },
})

const mapDispatchToProps = (dispatch) => ({
    getDatabaseUser: (firUId) => dispatch(setUserFromFirebase(dispatch,firUId)),
    setStrings: () => dispatch(setStrings(dispatch)),
});
const mapStateToProps = ({raquetas}) => ({
    raquetas: raquetas
});

export default connect(mapStateToProps,mapDispatchToProps)(LoadingUser);
