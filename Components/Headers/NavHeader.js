import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
} from 'react-native';
import { Colors } from '../../src/Constants';

export default NavHeader = ({title,rightButton,leftButton}) => (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rightButtonContainer}>
                {rightButton}   
            </View>
            <View style={styles.leftButtonContainer}>
                {leftButton}
            </View>
        </SafeAreaView>
    </View>
)

const styles = StyleSheet.create({
    container:{
        alignSelf:'flex-start',
        width:'100%',
        height:'10%',
        backgroundColor: Colors.primaryColor,
        borderBottomWidth:1,
        borderBottomColor: Colors.backgroundGrey,  
    },
    safeContainer:{
        width:'100%',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize:18,
        fontWeight: 'bold',
        color: Colors.white,
        alignSelf:'center',
    },
    rightButtonContainer:{
        height:'100%',
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        bottom:0,
        right:10,
    },
    leftButtonContainer:{
        height:'100%',
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        bottom:0,
        left:10,
    }
    
})