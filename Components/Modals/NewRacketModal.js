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
import { addUserRacket } from '../../src/js/actions/ActionIndex';
import UUIDGenerator from 'react-native-uuid-generator';
import { uploadRacket } from '../../Utils/firebaseController';
import { ic_close } from '../../Images/Images';

function getRandomId(){
    return Math.floor(Math.random() * 100) + 1;
}

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

    onAcceptButton = () => {
        const raqueta = this.state.raqueta;
        for (const key in raqueta) {
            if (raqueta.hasOwnProperty(key)) {
                const element = raqueta[key];
                if(!element){
                    this.props.onClose();
                    return;
                }
            }
        }
        raqueta.id = getRandomId();
        this.props.addRacket(raqueta);
        uploadRacket(this.props.user.id,raqueta);
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
        borderRadius:15,
        marginTop:20,
        height:35,
    },
    title:{
        textAlign:'center',
        fontSize:24,
        width:'100%',
        height:65,
        marginBottom:20,
        borderWidth: 1,
        paddingTop:15,
        borderColor:'#A8A0A0',
    },
    button:{
        height:45,
        width:'100%',
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',
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
    return {addRacket: (racket)=>{dispatch(addUserRacket(racket))}}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewRacketModal);