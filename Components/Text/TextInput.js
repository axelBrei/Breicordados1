import React from 'react';
import { Hoshi } from 'react-native-textinput-effects';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Colors } from '../../src/Constants';

export default TextInput = ({onChangeText,placeholder, value, style, onLayout,onEndEditing}) => (
    <Hoshi
        onLayout={onLayout}
        style={style}
        value={value}
        label={placeholder}
        onChangeText={onChangeText}
        borderColor={Colors.secondaryDarkColor}
        labelStyle={styles.labelStyle}
        inputStyle={styles.inputStyle}
    />
)

TextInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}

const styles = StyleSheet.create({
    labelStyle:{
        color: Colors.secondaryColor,
    },
    inputStyle:{
        color: Colors.black,
    }
})