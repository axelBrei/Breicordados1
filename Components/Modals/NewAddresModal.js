import React from 'react';
import { Colors } from '../../src/Constants';
import {
    View,
    StyleSheet,
    Modal
} from 'react-native';
import PropTypes from 'prop-types';
import TextInput from '../../Components/Text/TextInput';

export default class NewAddresModal extends React.Component{
    state = {
        
    }

    render() {
        const { visible , onClose } = this.props;
        return (
            <Modal
            visible={visible}
            style={styles.modal}
            animationType={'slide'}
            >
            <View style={styles.container}>
                <TextInput 
                    placeholder={'Direcciones'}
                    onChangeText={()=>{}}
                />
                <TextInput 
                    placeholder={'Direcciones'}
                    onChangeText={()=>{}}
                />
            </View>
        </Modal>
        );
    }
}

NewAddresModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,

}

const styles = StyleSheet.create({
    modal:{
    },
    container:{
        backgroundColor: Colors.backgroundWhiteColor,
        height:'100%',
        width: '100%',
        padding:20,
        paddingTop:100,
    }
})