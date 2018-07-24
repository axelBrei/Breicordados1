import React from 'react';
import Modal from 'react-native-modal';
import FormInput from '../NewOrder/ExpandableInput';
import { connect } from 'react-redux';
import { addOrderFirebase } from '../../src/js/actions/ActionIndex';
import ExpandableList from '../NewOrder/ExpandableList';
import ItemRaquetLite from '../ListItems/ItemRaquetaLite';
import ItemCuerdaLite from '../ListItems/ItemCuerdaLite';
import { ic_close } from '../../Images/Images';

import {
    View,
    TouchableOpacity,
    Alert,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

function getRandomId(){
    return Math.floor(Math.random() * 100) + 1;
}

class NewOrderModal extends React.Component{
    state = {
        raqueta:{},
        cuerda:{},
        tension:'',
        userId:this.props.userId,
        orderId:'',
        status:'Recibida',
        
    }

    isOrderEmpty(){
        const { state } = this;
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                const element = state[key];
                if(!element){
                    return true
                }
            }
        }
        return false;
    }
    
    getText(tension){
        this.setState({
            ...this.state,
            tension:tension,
        });
    }

    onPresRaqueta(raqueta){
        this.setState({
            ...this.state,
            raqueta: raqueta,
        });
      }
    onPressCuerda(cuerda){
        this.setState({
            ...this.state,
            cuerda:cuerda,
        })
    }

    onPressAccept = ()=>{
        const uuidV1 = require('uuid/v1');
            this.setState({
                orderId: uuidV1(),
            }, ()=>{
                this.props.addOrder(this.state);
                this.setState({
                    raqueta:{},
                    cuerda:{},
                    tension:'',
                    orderId:'',
                },() => {
                    this.props.closeModal();
                })
            })
    }

    render() {
        const { raqueta , cuerda} = this.state;
        return (
            <Modal
                isVisible={this.props.isVisible}
                style={styles.modal}
                onBackdropPress={this.props.closeModal}
            >
            <View style={styles.container}>
                <Text style={styles.title}>Haga su pedido</Text>
                <TouchableOpacity onPress={this.props.closeModal} style={styles.closeButton}>
                    <Image  source={ic_close} style={styles.image}/>
                </TouchableOpacity>
                <View style={styles.divider} />

                <ExpandableList
                    placeholderStyle={styles.input}
                    maxHeight={120}
                    placeholder={Object.keys(raqueta).length ? `${raqueta.marca} ${raqueta.modelo}`:'Seleccione una raqueta'}
                    data={this.props.raquetas}
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
                    maxHeight={120}
                    placeholder={Object.keys(cuerda).length ? `${cuerda.marca} ${cuerda.nombre} ${cuerda.grosor}mm`:'Seleccione el encordado'}
                    data={this.props.cuerdas}
                    renderItem={({ item }) => (
                        <ItemCuerdaLite
                            cuerda = {item}
                            onPress={this.onPressCuerda.bind(this)}
                        />
                    )}
                />
                <TouchableOpacity
                    onPress={() => this.onPressAccept()}
                    style={styles.button}>
                    <Text style={{textAlign:'center'}}>Aceptar</Text>
                </TouchableOpacity>
            
        </View>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal:{
        flex:1, 
        height:'100%',
        width: '90%',
        justifyContent:'center',
    },
    container:{
        flexDirection:'column',
        height:'80%',
        backgroundColor:'white',
        borderRadius:15,
    },
    input:{
        textAlign: 'center',
        height: 35,
        width: '95%',
        borderWidth:1,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        borderColor: 'orange',
    },
    button:{
        alignItems:'center',
        backgroundColor:'orange',
        width:'100%',
        height:40,
        justifyContent:'center',
        position:'absolute',
        bottom:0,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        },
    title:{
        fontSize:30,
        paddingTop:20,
        paddingBottom:10,
        paddingStart:15,
    },
    divider:{
        height:1,
        width:'100%',
        backgroundColor: '#A8A0A0',
        marginBottom:20,
    },
    closeButton:{
        position: 'absolute',
        top:0,
        right:0,
        margin:15,
        
    },
    image:{
        height:15,
        width:15,
        resizeMode: 'contain',
    },
});



function mapStateToProps(state){
    return { cuerdas: state.cuerdas,
        raquetas: state.raquetas,
        userId:state.userData.id}
  }

function mapDispatchToProps(dispacth){
    return {
        addOrder: (order) => dispacth(addOrderFirebase(dispacth,order)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewOrderModal);



