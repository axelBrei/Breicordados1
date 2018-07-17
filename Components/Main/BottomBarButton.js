import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';

export default class BottomBarButton extends React.Component{

handleClick(){

  this.props.onClick(this.props.text);
}

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
        onPress={this.handleClick.bind(this)}>
          <SafeAreaView style={styles.touchableContainer}>
              <Image source={this.props.source}  style={{
                width: 35,
                height: '65%',
                resizeMode: 'contain',
                tintColor: this.props.color
              }}/>
              <Text style={{
                height: '20%',
                fontSize: 12,
                color: this.props.color
              }}> {this.props.text} </Text>
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableContainer:{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

})
