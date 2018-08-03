import {StyleSheet, TouchableOpacity , View, Text} from "react-native";
import React from "react";
import { Colors } from '../../Constants';

export const swipeableContent = (onPress) => {
    return {
        right: [
            <TouchableOpacity
                onPress={() => onPress(0)}
                style={styles.buttonContainer}
                underlayColor={Colors.grey}
            >
                <View style={[
                    styles.rigthBtnBackground, 
                    { backgroundColor: Colors.primaryLightColor}
                ]}>
                    <Text style={styles.rigthBtnText}>Eliminar</Text>
                </View>
            </TouchableOpacity>,
            <TouchableOpacity
                onPress={() => onPress(1)}
                underlayColor={Colors.grey}
            >
                <View style={[
                    styles.rigthBtnBackground, 
                    { backgroundColor: Colors.lightGreen}
                ]}>
                    <Text style={styles.rigthBtnText}>Editar</Text>
                </View>
            </TouchableOpacity>,
        ],
    }
};

const styles = StyleSheet.create({
    rigthBtnBackground:{
        height:'100%',
        width:'30%',
        justifyContent:'center',
        alignItems:'center',
    },
    rigthBtnText:{
        color:'#ffffff',
        fontSize:20,
    },
});