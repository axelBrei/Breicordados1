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
import { getRaquetas } from "../../Utils/firebaseController";
import firebase from  'react-native-firebase';
import  ItemRaqueta  from "../../Components/ListItems/ItemRaqueta";
import { connect } from "react-redux";
import {getUserFirebaseRackets, removeUserRacketFirebase} from "../../src/js/actions/ActionIndex";
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
            raquetas: newProps.raquetas.reverse(),
        })
    }
  }

  _keyExtractor = (item, index) => item.id;


  onDeleteSwipe(raqueta){
   this.props.removeUserRacket(this.props.userId,raqueta);
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
      this.setState({refreshing:true}, () => {
        this.props.getFirebaseRackets(this.props.userId)
        .then(() => this.setState({refreshing:false}));
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
            data={this.props.raquetas}
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
    return {
        raquetas: state.raquetas,
        userId: state.userData.id,
    };
};


function mapDispatchToProps(dispatch){
    return {
        getFirebaseRackets: (userId)=> dispatch(getUserFirebaseRackets(dispatch,userId)),
        removeUserRacket: (userId,racket)=>{
            dispatch(removeUserRacketFirebase(dispatch,userId,racket))
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(MisRaquetasScreen);