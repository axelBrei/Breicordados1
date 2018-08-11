import React from 'react';
import { Colors } from '../../src/Constants';
import {
    View,
    StyleSheet,
    Modal,
    Text,
    Alert,
    Platform,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import NavHeader from '../Headers/NavHeader';
import BackButtonHeader from '../Buttons/BackButtonHeader';
import NewAddresContainer from '../Containers/NewAddresContainer';
import { isValidAddress } from '../../src/Validator';

export default class AddresModal extends React.Component{
    state = {
        addres:{},
    }

    getAddressFromContainer = (addres) => {
        this.setState({
            addres: addres,
        })  
    }

    onPressAccept = () => {
        if(isValidAddress(this.state.addres)){

        }else{
            Alert.alert('Debe completar todos los datos para poder continuar');
        }
    }

    render() {
        const { visible } = this.props;
        return (
            <Modal
            visible={visible}
            animationType={'slide'}>
                <View style={styles.container}>
                        <NavHeader 
                            title={'Nueva Direccion'}
                            leftButton={
                                <BackButtonHeader 
                                    title={Platform.OS === 'ios'?'Volver':''}
                                    onPress={this.props.onClose}
                                />
                            }/>

                        <View style={styles.contentContainer}>
                            <NewAddresContainer 
                                handleChanges={this.getAddressFromContainer}/>
                        </View>
                        <TouchableOpacity
                        onPress={()=> this.onPressAccept()} 
                        style={styles.acceptButtonContainer}>
                            <Text style={styles.btnText}>Aceptar</Text>
                        </TouchableOpacity>
                </View>
        </Modal>
        );
    }
}

AddresModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        width:'100%',
        height:'100%',
    },
    headerContainer:{
        height: '15%',
    },
    contentContainer:{
        height:'85%',
    },
    acceptButtonContainer:{
        height: '8%',
        position: 'absolute',
        bottom:5,
        right:10,
        left:10,
        backgroundColor: Colors.secondaryDarkColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
    },
    btnText:{
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }
})
