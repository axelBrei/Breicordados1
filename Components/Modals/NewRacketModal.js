import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import ExandableInput from '../NewOrder/ExpandableInput';
import { connect } from 'react-redux';
import { addRacketFirebase } from '../../src/js/actions/ActionIndex';
import UUIDGenerator from 'react-native-uuid-generator';
import { uploadRacket } from '../../Utils/firebaseController';
import { ic_close } from '../../Images/Images';

class NewRacketModal extends React.Component{
    state = {
        raqueta:{
            id:'',
            marca:'',
            modelo:'',
            peso:'',
            patron:'',
            grip:'',
        },
        modalVisible: false,
    }

    hideModal = () => {
        this.setState({
            modalVisible:!this.state.modalVisible,
        })
    }

    getText(text,campo){
        let raqueta = Object.assign({},this.state.raqueta);
        raqueta[campo] = text;
        this.setState({raqueta})
    }

    isValidRacket(racket) {
        for (const key in racket) {
            if (racket.hasOwnProperty(key)) {
                const element = racket[key];
                if(element === ''){
                    return false;
                }
            }
        }
        return true;
    }

    onAcceptButton = () => {
        const uuidV1 = require('uuid/v1');
        const raqueta = this.state.raqueta;
        raqueta.id = uuidV1();
        if(this.isValidRacket(raqueta)){
            this.props.addRacket(this.props.user.id,raqueta);
        }
        this.props.onClose();
    }

    render() {
        return (
            <Modal
            isVisible={this.props.visible}
            style={styles.modal}
            onBackdropPress={this.props.onClose}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Nueva Raqueta</Text>
                <TouchableOpacity onPress={this.props.onClose} style={styles.closeButton}>
                    <Image  source={ic_close} style={styles.image}/>
                </TouchableOpacity>
                <View style={styles.divider} />
                <Text style={styles.descText}>Ingrese los datos de la raqueta</Text>
                <ExandableInput 
                    placeholder={'Marca'}
                    style={styles.input}
                    getText={this.getText.bind(this)}
                />
                <ExandableInput 
                    placeholder={'Modelo'}
                    style={styles.input}
                    getText={this.getText.bind(this)}
                />
                <ExandableInput 
                    placeholder={'Peso'}
                    style={styles.input}
                    keyboardType={'numeric'}
                    getText={this.getText.bind(this)}
                />
                <ExandableInput 
                    placeholder={'Patron'}
                    style={styles.input}
                    getText={this.getText.bind(this)}
                />
                <ExandableInput 
                    placeholder={'Grip'}
                    style={styles.input}
                    getText={this.getText.bind(this)}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    onPress={this.onAcceptButton}
                    style={styles.button}>
                        <Text>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal:{
        flex:1, 
        marginTop:50,
        position: 'absolute',
        height:'80%',
        width: '90%',
        justifyContent:'center',
    },
    container:{
        flex:1,
        display:'flex',
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:15,
    },
    buttonContainer:{
        flexDirection:'column-reverse',
        alignItems:'center',
        flex:1,
    },
    input:{
        borderWidth:1,
        borderColor:'orange',
        width:'90%',
        textAlign:'center',
        borderRadius:10,
        marginTop:20,
        height:35,
    },
    title:{
        textAlign:'center',
        fontSize:24,
        width:'100%',
        height:65,
        paddingTop:15,
        borderColor:'#A8A0A0',
    },
    divider:{
        height:1,
        width:'100%',
        backgroundColor: '#A8A0A0',
        marginBottom:20,
    },
    button:{
        height:45,
        width:'100%',
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
    closeButton:{
        position: 'absolute',
        top:0,
        right:0,
        margin:20,
    },
    image:{
        height:15,
        width:15,
        resizeMode: 'contain',
    },
    descText:{
        textAlign:'center',
        fontSize:18,
    }
})

function mapStateToProps(state){
    return {user: state.userData}
}

function mapDispatchToProps(dispatch){
    return {addRacket: (userId,racket)=>{dispatch(addRacketFirebase(dispatch,userId,racket))}}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewRacketModal);