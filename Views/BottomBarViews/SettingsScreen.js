import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import firebase from 'react-native-firebase';
import UserInfo from '../../Components/Settings/UserInfo';
import EditDataModal from '../../Components/Settings/EditDataModal';
import { connect } from "react-redux";
import {reciveUser } from '../../src/js/actions/ActionIndex';
import {uploadUser } from '../../Utils/firebaseController';
import { sections } from '../../src/js/constants/SettingsItems';
import AddresListHeader from '../../Components/Settings/AddresListHeader';
import ItemAddres from '../../Components/ListItems/ItemAddres';
import { ic_add, ic_location, ic_log_out} from '../../Images/Images';
import NewAddresModal from '../../Components/Modals/NewAddresModal';
import { Colors } from '../../src/Constants';
import LogOutButton from '../../Components/Buttons/LogOutButton';

class SettingsScreen extends React.Component{
  static navigationOptions = ({navigation}) => {
    return {
      title:'Mis Datos',
      headerRight: (
        <LogOutButton 
          onPress={()=>{
          firebase.auth().signOut()
          navigation.navigate('Login');
        }}
      />
    )
    }
  }
  state = {
    modalVisible:false,
    modalPlaceholder: '',
    newAddresModalVisible: false,
  }

  onPressItem(placeholder){
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalPlaceholder: placeholder,
    })
  }
  onPressAddres = (index) => {
    if(index === 0){
      // Open new addres modal
      this.toogleNewAddresModal();
    }
  }
  renderItem = ({item,index, section}) => {
    if(section.key === 'Direcciones'){
      return (
        <ItemAddres 
          title={item.placeholder}
          data={item.data}
          index={index}
          source={index===0 ? ic_add: ic_location}
          onPress={this.onPressAddres}
        />
      )
    }
    return (
      <UserInfo 
              onPress={item.placeholder !== 'Nombre' ? this.onPressItem.bind(this): ()=>{}}
              placeholder={item.placeholder}
              data={item.data} />
    );
  }
  renderSectionHeader = ({section}) => {
    if(section.key === 'Direcciones'){
      return (
        <AddresListHeader title={section.key}/>
      );
    }
  }
  toggleModal = ()=>{
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
  }
  toogleNewAddresModal = () => {
    this.setState({
      newAddresModalVisible: !this.state.newAddresModalVisible,
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
          <View style={styles.userImageHeader}></View>
          <SectionList
            style={styles.userDataList}
            sections={sections(this.props.userData)}
            keyExtractor={item => item.data}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
          />

        <EditDataModal 
          placeholder={this.state.modalPlaceholder}
          getModaltext={this.getModaltext.bind(this)}
          visible={this.state.modalVisible}
          onCloseButton={this.toggleModal.bind(this)}
        />
        <NewAddresModal 
          onClose={this.toogleNewAddresModal}
          visible={this.state.newAddresModalVisible}
        />

      </View>
    );
  }
};



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  contentContainer:{
    width:'100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  userDataList:{
    flex:1,
    width:'100%',
  },
  singOut:{
    borderRadius: 15,
    backgroundColor: 'orange',
    height: 40,
    width: '95%',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
  },
  userImageHeader:{
    height:'30%',
    width:'100%',
    backgroundColor: Colors.backgroundGrey,
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
