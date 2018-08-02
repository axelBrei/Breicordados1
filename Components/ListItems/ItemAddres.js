import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../../src/Constants'

const ItemAddres = ({onPress,title, source, data, index}) => (
        <TouchableOpacity 
            onPress={() => {
                onPress(index)
            }}>
            <View style={styles.container}>
                <Image 
                 source={source} 
                 style={styles.image}
                />
             <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>

)

export default ItemAddres;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems: 'center',
    },
    image:{
        resizeMode: 'contain',
        width:15,
        height:15,
    },
    text:{
        marginStart:7,
        color:Colors.grey,
        fontSize:18,
        fontStyle: 'italic',

    },
})