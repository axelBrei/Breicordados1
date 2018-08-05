import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
}from 'react-native';
import PropTypes from 'prop-types';
import { ic_info } from '../../Images/Images';

export default ItemCuerda = ({onPress, cuerda}) => (
    <TouchableOpacity
        onPress={() => onPress(cuerda)}
    >
        <View style={styles.container}>
                <Image style={styles.image} source={ic_info}/>
                <Text style={styles.title}>{`${cuerda.marca} ${cuerda.nombre}`}</Text>
            </View>
    </TouchableOpacity>
)

ItemCuerda.propTypes = {
    cuerda: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor:'white',
        padding: 10,
    },
    title:{
        fontSize:20,
        marginStart:10,
        marginTop:2,

    },
    image:{
        position: 'absolute',
        right:15,
        height:20,
        width:20,
        resizeMode:'contain',
        tintColor:'grey',
        alignSelf: 'center',
    }

});