import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class ItemRaquetaLite extends React.Component{
  constructor(props){
    super(props);
  }
  onPressCell(){
    this.props.onPress(this.props.raqueta);
  }

  render(){
    return (
      <View style={raquetaLiteStyle.container}>
        <TouchableOpacity onPress={this.onPressCell.bind(this)}>
          <View>
            <Text>{`${this.props.raqueta.marca} ${this.props.raqueta.modelo}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const raquetaLiteStyle = StyleSheet.create({
  container:{
    display: 'flex',
    marginTop: 5,
    marginBottom: 5,
    height: 20,
  }
});


