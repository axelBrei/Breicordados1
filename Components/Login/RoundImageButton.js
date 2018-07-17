import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class RoundImageButton extends React.Component{

  onPress(){
    this.props.onPress();
  }

  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity
        onPress={this.props.onPress.bind(this)}>
          <SafeAreaView>
            <Image
            style={styles.image}
              source={this.props.source}
            />
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  conatiner:{
    width: 60,
    height: 60,
  },
  image:{
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: 10,
  }
});
