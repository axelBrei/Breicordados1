import React from 'react';
import { Colors } from '../../src/Constants';
import {
    View,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import NavHeader from '../Headers/NavHeader';
import BackButtonHeader from '../Buttons/BackButtonHeader';
import NewAddresContainer from '../Containers/NewAddresContainer';

export default class AddresModal extends React.Component{
    state = {

    }

    render() {
        const { visible } = this.props;
        return (
            <Modal
            visible={visible}
            animationType={'slide'}>
                <View style={styles.container}>
                        <NavHeader 
                            title={'Nueva Raqueta'}
                            leftButton={
                                <BackButtonHeader 
                                    title={'Volver'}
                                    onPress={this.props.onClose}
                                />
                            }/>

                        <View style={styles.contentContainer}>
                            <NewAddresContainer />
                        </View>
                        <TouchableOpacity
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
