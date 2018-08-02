import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { Colors } from '../../src/Constants';

const AddresListheader = ({title}) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
    </View>
)
    


const styles = StyleSheet.create({
    container:{
        alignItems:'flex-start',
        justifyContent:'center',
        paddingHorizontal:20,
        paddingVertical: 10,
    },
    text:{
        fontSize:14,
        color: Colors.secondaryDarkColor,
        fontStyle: 'italic',
    },
})

export default AddresListheader;