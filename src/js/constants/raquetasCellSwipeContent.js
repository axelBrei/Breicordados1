import {
    StyleSheet, 
    TouchableOpacity, 
    View, 
    Text,
    Image,
} from "react-native";
import React from "react";
import { Colors } from '../../Constants';
import { ic_edit } from '../../../Images/Images';

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

export const swipeableContentAddresItem = (onPress,index,data) => {
    return [
        <TouchableOpacity
            style={addresStyles.container}
            onPress={() => onPress(index,data)}>
            <Image style={addresStyles.image} source={ic_edit}/>
        </TouchableOpacity>,
        ];
}

const addresStyles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        backgroundColor: Colors.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        alignSelf:'flex-start',
        height: 25,
        width: 25,
        resizeMode: 'center',
        marginStart: 20,
    },
})

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