import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { Colors } from '../../src/Constants';
import { ic_log_out } from '../../Images/Images';

export default LogOutButton = ({onPress}) => (
    <TouchableOpacity 
        onPress={onPress}
        style={styles.container}>
        <Image source={ic_log_out} style={styles.image}/>
        <Text style={styles.text}>salir</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'center',
        marginRight:20,
    },
    text:{
        fontSize: 12,
        textAlign:'center',
        color: Colors.white,
    },
    image:{
        height:22,
        width:22,
        resizeMode:'contain', 
        tintColor: Colors.white,
    }
})