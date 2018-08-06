import React from 'react';
import { Colors } from '../../src/Constants';
import {
    View,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import TextInput from '../../Components/Text/TextInput';

export default NewAddresContainer = () => (
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
)

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.backgroundWhiteColor,
        padding:20,
        height:'100%',
    },
})