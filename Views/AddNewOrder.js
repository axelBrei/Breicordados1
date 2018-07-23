import React from 'react';
import {
  View,
  StyleSheet,
    Text,
  TouchableOpacity,
} from 'react-native';
import FormInput from '../Components/NewOrder/ExpandableInput';
import  ItemRaquetLite from '../Components/ListItems/ItemRaquetaLite';
import ItemCuerdaLite from '../Components/ListItems/ItemCuerdaLite';
import firebase from 'react-native-firebase';
import { getRaquetas , getCuerdas} from '../Utils/firebaseController';
import ExpandableList from '../Components/NewOrder/ExpandableList';

export default class AddNewOrderScreen extends React.Component{
  state = {
    raquetas:[],
    cuerdas: [],
    orden:{
      cuerda: {},
        raqueta: {},
        tension: '',
    },
  };

  componentDidMount(){
    const firUId = firebase.auth().currentUser.uid;
    this.getRaquetasFirebase(firUId);
    this.getCuerdasFirebase(firUId);
  }

   getRaquetasFirebase(firUId){
    getRaquetas(firUId)
    .then( (snapshot) => {
      this.setState({
        raquetas: snapshot,
      })
    })
  }

  getCuerdasFirebase(firUId){
    getCuerdas(firUId)
    .then( (snapshot) => {
      this.setState({cuerdas:snapshot});
    })
  }

  getText(text){
    this.setState({
        tension:  text,
    })
  }
  onPresRaqueta(item){
    let orden = Object.assign({}, this.state.orden);
    orden.raqueta = item;
    this.setState({orden});
  }
  onPressCuerda(item){
    let orden = Object.assign({}, this.state.orden);
    orden.cuerda = item;
    this.setState({orden})
  }

  onPressAccept(){
      // TODO upload order to firebase
      this.props.navigation.goBack();
  }

  render(){
    const { raqueta , cuerda} = this.state.orden;
    return (
        <View style={styles.container}>
            <View
                style={styles.mainView}>
                <Text style={{fontSize:30,margin:10}}>Haga su pedido</Text>
                <ExpandableList
                    placeholderStyle={styles.input}
                    maxHeight={150}
                    placeholder={Object.keys(raqueta).length != 0? `${raqueta.marca} ${raqueta.modelo}`:'Seleccione una raqueta'}
                    data={this.state.raquetas}
                    renderItem={({ item }) => (
                        <ItemRaquetLite
                            raqueta={item}
                            onPress={this.onPresRaqueta.bind(this)}
                        />
                    )}
                />
                <FormInput
                    placeholder={'Tension'}
                    style={styles.input}
                    getText={this.getText.bind(this)}/>
                <ExpandableList
                    placeholderStyle={styles.input}
                    maxHeight={150}
                    placeholder={Object.keys(cuerda).length ? `${cuerda.marca} ${cuerda.nombre} ${cuerda.grosor}mm`:'Seleccione el encordado'}
                    data={this.state.cuerdas}
                    renderItem={({ item }) => (
                        <ItemCuerdaLite
                            cuerda = {item}
                            onPress={this.onPressCuerda.bind(this)}
                        />
                    )}
                />
            </View>
            <View style={{flexDirection:'column-reverse',justifyContent:'flex-start',flex:1,alignItems:'center'}}>
                <TouchableOpacity
                    onPress={() => this.onPressAccept()}
                    style={styles.button}>
                    <Text style={{textAlign:'center'}}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
};
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        height:'100%',
        backgroundColor:'white',
        paddingTop:15,
    },
  mainView:{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    input:{
        textAlign: 'center',
        height: 35,
        width: '95%',
        borderWidth:1,
        borderRadius: 15,
        margin: 10,
        alignItems: 'center',
        borderColor: 'orange',
    },
    button:{
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'orange',
        width:'95%',
        height:40,
        justifyContent:'center',
        margin:10,
    }

});
