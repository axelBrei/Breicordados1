import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  SectionList,
} from 'react-native';
import firebase from 'react-native-firebase';
import UserInfo from '../../Components/Settings/UserInfo';
import EditDataModal from '../../Components/Settings/EditDataModal';
import { connect } from "react-redux";
import {uploadUser } from '../../Utils/firebaseController';
import { sections } from '../../src/js/constants/SettingsItems';
import AddresListHeader from '../../Components/Settings/AddresListHeader';
import ItemAddres from '../../Components/ListItems/ItemAddres';
import { ic_add, ic_location, ic_log_out} from '../../Images/Images';
import AddresModal from '../../Components/Modals/AddresModal';
import { Colors } from '../../src/Constants';
import LogOutButton from '../../Components/Buttons/LogOutButton';
import { getUserAddressFromFirebase  }from '../../src/js/actions/ActionIndex';
import CommonSeparator from '../../Components/Separators/CommonSeparator';


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

  componentDidMount(){
    this.props.fetchAddresList(this.props.userData.id);
  }

  onPressItem(placeholder){
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalPlaceholder: placeholder,
    })
  }
  onPressAddres = (index,data) => {
    if(index == 0){
      this.toogleNewAddresModal();
    }else{
      // TODO get addres from user data
      this.toogleNewAddresModal(data);
    }
  }
  renderItem = ({item,index, section}) => {
    if(section.key === 'Direcciones'){
      const title = index === 0 ? item.placeholder:item.calle + ' ' + item.altura + ' ' + item.departamento;
      return (
        <ItemAddres 
          title={title}
          data={item}
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
  toogleNewAddresModal = (addres) => {
    this.setState({
      ...this.state,
      newAddresModalVisible: !this.state.newAddresModalVisible,
      modalData: addres ? addres:{},
    })
  }
  getModaltext(campo,text){
    this.setState({
      modalVisible:false,
    })
    this.props.userData[campo] = text;
    uploadUser(this.props.userData)
    
  }

  renderSeparator = (props) => {
    const section = props.section.key;
    if(section === 'Direcciones'){
      return (<CommonSeparator />)
    }
    return (<View/>);
    
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.userImageHeader}></View>
          <SectionList
            style={styles.userDataList}
            sections={sections(this.props.userData,this.props.addres)}
            keyExtractor={item => item.data}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
          />

        <EditDataModal 
          placeholder={this.state.modalPlaceholder}
          getModaltext={this.getModaltext.bind(this)}
          visible={this.state.modalVisible}
          onCloseButton={this.toggleModal.bind(this)}
        />
        <AddresModal 
          onClose={this.toogleNewAddresModal}
          modalData={this.state.modalData}
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
  return {
    userData: state.userData,
    addres: state.addres
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchAddresList: (userId) => dispatch(getUserAddressFromFirebase(dispatch,userId)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingsScreen);
