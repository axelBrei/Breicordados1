import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../../src/Constants';
import PropTypes from 'prop-types';
import { ic_close } from '../../Images/Images';

export default ModalHeader = ({title,onPressClose, style}) => (
    <View
        style={styles.container}
    >
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity 
            onPress={onPressClose}
            style={styles.imageContainer}>
            <Image source={ic_close} style={styles.closeImaage}/>
        </TouchableOpacity>
    </View>
)

ModalHeader.propTypes = {
    title: PropTypes.string,
    onPressClose: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
       paddingVertical: 10, 
       alignItems:'center',
       justifyContent:'center',
       borderBottomWidth:1,
       borderColor: Colors.backgroundGrey,
    },
    text:{
        fontSize:24,
        textAlign:'center',
    },
    imageContainer:{
        position: 'absolute',
        right:15,
        top:15,
    },
    closeImaage:{
        resizeMode: 'contain',
        height:17,
        width:17,
    }
})