import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import ItemCuerda from '../../Components/ListItems/ItemCuerda';
import { connect } from 'react-redux';
import { setStrings } from "../../src/js/actions/ActionIndex";
import TextModal from '../../Components/Modals/TextModal';
import CommonSeparator from '../../Components/Separators/CommonSeparator';



class MisCuerdasScreen extends React.Component{
  static navigationOptions = {
    title:'Cuerdas'
  }

  state = {
    refreshing: false,
    isModalVisible: false,
    modalData: {
      data:[],
      title: '',
    },
  }
  onPressItem = (cuerda) => {
    const data = {
      data:[
        {title:'Tipo', data:cuerda.tipo},
        {title:'Calibre', data: cuerda.grosor},
        {title:'Forma', data: cuerda.forma},
        {title:'Material', data: cuerda.material}
      ],
      title: cuerda.marca + ' ' + cuerda.nombre,
    };
    this.setState({
      isModalVisible: true,
      modalData: data,
    })
  }

  renderItem = ({item}) => {
    return (
      <ItemCuerda 
        onPress={this.onPressItem}
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

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    })
  }

 

  render() {
    const { modalData } = this.state;
    return (
      <View style={styles.container}>
      <FlatList
        keyExtractor={this._keyExtractor}
        data={this.props.cuerdas}
        ItemSeparatorComponent={CommonSeparator}
        renderItem={this.renderItem}
        refreshControl={
          <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
          />
      }
      />
      <TextModal 
        isVisible={this.state.isModalVisible}
        data={this.state.modalData.data}
        closeModal={this.toggleModal}
        title={this.state.modalData.title}
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