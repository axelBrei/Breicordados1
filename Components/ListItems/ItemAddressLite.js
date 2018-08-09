import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default ItemAddressLite = ({onPress,title,desc,data}) => (
    <TouchableOpacity 
        onPress={()=> onPress(title,data)}>
        <View style={styles.container}>
            <Text>{title}</Text>
        </View>
    </TouchableOpacity>
)


const styles = StyleSheet.create({
    container:{
        height: 40,
        padding:5,
    }
})