import React from 'react';
import Modal from 'react-native-modal';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import ModalHeader from '../Headers/ModalHeader';
import { Colors } from '../../src/Constants';

export default TextModal = ({isVisible, data, title, closeModal}) => (
    <Modal 
        style={styles.modal}
        isVisible={isVisible}
        onBackdropPress={closeModal}>
        <View style={styles.container}>
            <ModalHeader title={title} onPressClose={closeModal}/>
            <View style={styles.description}>{
                data.map((data) => (
                    <Text style={{fontSize:16}}>
                        {data.title + ': ' + data.data}
                    </Text>
                ))
            }</View>
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    modal:{
        flex:1,
    },
    container:{
        backgroundColor: Colors.white,
        borderRadius:5,
        width:'100%',
        padding:10,
    },
    description:{
        padding:15,
        paddingTop:10,
    }
})