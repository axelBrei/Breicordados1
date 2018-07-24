import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Alert,
  Image,
  TouchableOpacity,
  FlatList,
    RefreshControl,
} from 'react-native';
import { getRaquetas} from "../../Utils/firebaseController";
import firebase from  'react-native-firebase';
import  ItemRaqueta  from "../../Components/ListItems/ItemRaqueta";
import { connect } from "react-redux";
import {getUserRackets} from "../../src/js/actions/ActionIndex";
import FloatingActionButton from '../../Components/Main/FloatingActionButton';
import { ic_add } from '../../Images/Images';
import NewRacketModal from '../../Components/Modals/NewRacketModal';

 class MisRaquetasScreen extends React.Component{
    static navigationOptions = {
        title:'Mis Raquetas'
      }
  state = {
    raquetas: this.props.raquetas,
      refreshing: false,
      modalVisible: false,
  }

  componentWillReceiveProps(newProps){
    const { raquetas } = this.props;  
    if(raquetas.length < newProps.raquetas.length){
        this.setState({
            raquetas: newProps.raquetas,
        })
    }
  }

  _keyExtractor = (item, index) => item.id;

  getRaquetasFirebase(){
      getRaquetas(firebase.auth().currentUser.uid)
          .then( (snapshot) => {
              let raquetas = [];
              snapshot.forEach( (child) => {
                  raquetas.push(child.val());
              });
              this.setState({raquetas})
          })
      return new Promise(() => {});
  }
  onDeleteSwipe(raqueta){
      this.setState({
          raquetas: this.state.raquetas.filter( item => item.id != raqueta.id),
      })

  }
    renderSeparator = () => {
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
    renderItem = ({item}) => {
      return (
          <ItemRaqueta
              onDeleteSwipe={this.onDeleteSwipe.bind(this)}
              raqueta={item}
          />
      );
  };
  onRefresh = ()=>{
        // TODO get data from firebase
      this.setState({refreshinf: true},() => {
          this.getRaquetasFirebase().then( () => {
              this.setState({refreshing: false});
          })
      })
  }

  toggleModal(){
      this.setState({
          modalVisible: !this.state.modalVisible,
      });
  }
  

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.raquetas}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            }
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={this.renderItem.bind(this)}
        />

        <FloatingActionButton 
            source={ic_add}
            onPress={this.toggleModal.bind(this)}
        /> 

        <NewRacketModal
            onClose={this.toggleModal.bind(this)}
            visible={this.state.modalVisible}
        />

      </View>
    );
  }
}

         
       

const styles = StyleSheet.create({
    container:{
        display:'flex',
        width:'100%',
        height: '100%',
        flexDirection:'column',
        backgroundColor:'white',
    },
});

function mapStateToProps(state){
    return { raquetas: state.raquetas };
};



export default connect(mapStateToProps)(MisRaquetasScreen);