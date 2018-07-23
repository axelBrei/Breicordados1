import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Text,
} from 'react-native';
import ItemCuerda from '../../Components/ListItems/ItemCuerda';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { getCuerdas } from '../../Utils/firebaseController';


class MisCuerdasScreen extends React.Component{
  static navigationOptions = {
    title:'Cuerdas'
  }
  renderSeparator(){
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#95989A",
            }}
        />
    );
  };
  renderItem({item}){
    return (
      <ItemCuerda 
        cuerda={item}
      />
    );
  }
  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={styles.container}>
      <FlatList
        keyExtractor={this._keyExtractor}
        data={this.props.cuerdas}
        ItemSeparatorComponent={this.renderSeparator.bind(this)}
        renderItem={this.renderItem.bind(this)}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    backgroundColor:'white',
  }
})

function mapStateToProps(state){
  return { cuerdas: state.cuerdas}
}

export default connect(mapStateToProps)(MisCuerdasScreen);