import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import SwitchNavigation from '../../StackNavigation/MainStack';
import firebase from 'react-native-firebase';
import UserInfo from '../../Components/Settings/UserInfo';
import EditDataModal from '../../Components/Settings/EditDataModal';
import { connect } from "react-redux";
import {reciveUser } from '../../src/js/actions/ActionIndex';
import {uploadUser } from '../../Utils/firebaseController';

class SettingsScreen extends React.Component{
  static navigationOptions = {
    title:'Mis Datos'
  }
  state = {
    modalVisible:false,
    modalPlaceholder: '',
  }

  onPressItem(placeholder){
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalPlaceholder: placeholder,
    })
  }

  getData(){
    const { userData } = this.props;
    let items =[
      { placeholder:'Nombre', data:userData.nombreYApellido},
      { placeholder:'Mail', data:userData.mail},
      { placeholder:'Telefono', data:userData.telefono}
    ];
    return items;
  }
  renderItem({item}){
    return (
      <UserInfo 
              onPress={item.placeholder !== 'Nombre' ? this.onPressItem.bind(this): ()=>{}}
              placeholder={item.placeholder}
              data={item.data} />
    );
  }
  toggleModal = ()=>{
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
  }
  getModaltext(campo,text){
    this.setState({
      modalVisible:false,
    })
    this.props.userData[campo] = text;
    uploadUser(this.props.userData)
    
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FlatList 
            contentContainerStyle={styles.userDataList}
            data={this.getData()}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={ item => item.data}
            ItemSeparatorComponent={()=>{
              return(<View 
                style={{
                  height:1,
                  width:'100%',
                  backgroundColor:'#95989A'
                }}
              />)
            }}          
          />
          <View style={{flexDirection:'column-reverse',justifyContent:'flex-start',flex:1,alignItems:'center'}}>
          <TouchableOpacity style={styles.singOut}
            onPress={()=> {
              firebase.auth().signOut()
              this.props.navigation.navigate('Login');
            }}>
              <Text>Cerrar Sesion</Text>
            </TouchableOpacity> 
          </View>
        </View>

        <EditDataModal 
          placeholder={this.state.modalPlaceholder}
          getModaltext={this.getModaltext.bind(this)}
          visible={this.state.modalVisible}
          onCloseButton={this.toggleModal.bind(this)}
        />

      </View>
    );
  }
};



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  contentContainer:{
    width:'100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop:10,
  },
  userDataList:{
    width:'100%',
    height:'50%',
  },
  singOut:{
    borderRadius: 15,
    backgroundColor: 'orange',
    height: 40,
    width: '95%',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
  }
})

function mapStateToProps(state){
  return {userData: state.userData};
}

function mapDispatchToProps(dispatch){
  return {
    reciveUser: (user)=> dispatch(reciveUser(user)),
  }
}

export default connect(mapStateToProps)(SettingsScreen);
