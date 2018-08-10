import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../src/Constants';

export default ItemAddressLite = ({onPress,title,desc,data}) => (
    <TouchableOpacity 
        onPress={()=> onPress(data)}>
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}numberOfLines={1} >{desc}</Text>
        </View>
    </TouchableOpacity>
)


const styles = StyleSheet.create({
    container:{
        padding:10,
    },
    title:{
        fontWeight: 'bold',
    },
    desc:{
        fontSize: 12,
        color: Colors.grey,
    }
})