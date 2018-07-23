import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

export default class FormInput extends React.Component{

  state = {
    text: '',
  }

  getText(){
    this.props.getText(this.state.text,this.props.placeholder.toLowerCase());
  }

  render() {
    return (
        <View style={styles.container}>
            <TextInput
              style={[styles.input, this.props.style]}
              keyboardType={this.props.keyboardType ? this.props.keyboardType:'default'}
              placeholder={this.props.placeholder ? this.props.placeholder:'placeholder'}
              placeholderTextColor={'#000'}
              onChangeText= {(text)=>{
                this.setState({text});
              }}
              onSelectionChange= {this.getText.bind(this)}
              />

          </View>

    );
  }
}

const styles = StyleSheet.create({

  container:{
    width:'100%',
      alignItems:'center'
  },


})
