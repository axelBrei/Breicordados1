import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Text,
  RefreshControl,
} from 'react-native';
import ItemCuerda from '../../Components/ListItems/ItemCuerda';
import { connect } from 'react-redux';
import { setStrings } from "../../src/js/actions/ActionIndex";



class MisCuerdasScreen extends React.Component{
  static navigationOptions = {
    title:'Cuerdas'
  }

  state = {
    refreshing: false,
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

  onRefresh = ()=>{
    this.setState({refreshing:true}, ()=>{
      this.props.getStrings()
      .then( ()=> {
        this.setState({
          refreshing:false
        })
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <FlatList
        keyExtractor={this._keyExtractor}
        data={this.props.cuerdas}
        ItemSeparatorComponent={this.renderSeparator.bind(this)}
        renderItem={this.renderItem.bind(this)}
        refreshControl={
          <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
          />
      }
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

function mapDispatchToProps(dispatch){
  return {
    getStrings: ()=>dispatch(setStrings(dispatch)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MisCuerdasScreen);