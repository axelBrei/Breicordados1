import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

export default class ExpandableInput extends React.Component{

  state = {
    text: '',
  }

  getText(){
    this.props.getText(this.state.text);
  }

  render() {
    return (
        <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder={this.props.placeholder ? this.props.placeholder:'placeholder'}
              placeholderTextColor={'#878787'}
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
    height: 40,
    width: '85%',
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2f3030'
  },
  input:{
    textAlign: 'center',
  }

})
