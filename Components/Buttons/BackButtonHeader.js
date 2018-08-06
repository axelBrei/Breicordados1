import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import { ic_back } from '../../Images/Images';
import { Colors } from '../../src/Constants';

export default BackButtonHeader = ({title,onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <Image source={ic_back} style={styles.image}/>
            <Text style={styles.text}>{title}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:'100%',
    },
    image:{
        tintColor: Colors.white,
        height: 15,
        width: 15,
    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
    }
})