import React from 'react';
import FloatingActionButton from '../../Components/Main/FloatingActionButton';
import { ic_add } from '../../Images/Images';
import NewOrderModal from '../../Components/Modals/NewOrderModal';
import ItemPedido from '../../Components/ListItems/ItemPedido';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';

class MisPedidosScreen extends React.Component{
  static navigationOptions = {
    title:'Mis Pedidos'
  }
  state = {
    modalVisible: false,
  }

  toggleModal = ()=>{
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }

  renderItem = ({item})=>{
    return (
      <ItemPedido 
        data={item}
      />
    );
  }
  keyExtractor = (item,index) => item.orderId;

  render() {
    let listData = this.props.orders;
    return (
      <SafeAreaView style={styles.container}>

        <FlatList 
          data={listData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />

        <FloatingActionButton 
          source={ic_add}
          onPress={this.toggleModal.bind(this)}/>

        <NewOrderModal 
          isVisible={this.state.modalVisible}
          closeModal={this.toggleModal}
        />
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

});

function mapStateToProps(state){
  return {orders: state.orders};
}

export default connect(mapStateToProps)(MisPedidosScreen);
