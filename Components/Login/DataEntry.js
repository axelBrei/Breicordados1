import React from 'react';
import { SafeAreaView, Text , TextInput , StyleSheet, Alert } from 'react-native';

export default class DataEntry extends React.Component{



  getData(text){
    this.props.getData(this.props.placeholder.toLowerCase(), this.state.text);
  }

  render() {
    const { props } = this;
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder= {props.placeholder ? props.placeholder : ''}
          placeholderTextColor={'#2f3030'}
          autoCapitalize={'none'}
          secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
          onChangeText= {(text)=>{
            this.setState({text});
          }}
          onSelectionChange= {this.getData.bind(this)}
          // onEndEditing= {()=>{
          //   Alert.alert(' ' + this.state.text)
          // }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: '90%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#80E27E',
    marginBottom: 15,
  },
  input:{
    textAlign: 'center',
    fontSize: 14,
    height: '100%',

  }
})
