import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class FloatingActionButton extends React.Component{

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.opacity}
          onPress={this.props.onPress.bind(this)}>
          <View>
            <Image source={this.props.source} style={{height: 20,width: 20, resizeMode: 'contain'}}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom:0,
  },
  opacity:{
    borderRadius: 100,
    height: 56,
    width: 56,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  }
})
