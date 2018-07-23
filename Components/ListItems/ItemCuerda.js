import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    Image,
}from 'react-native';
import { ic_item_list } from '../../Images/Images';

export default class ItemCuerda extends React.Component{
    state = {
        item: this.props.cuerda,
    }
    render() {
        const { cuerda } = this.props;
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Image style={styles.image} source={ic_item_list}/>
                    <Text style={styles.title}>{`${cuerda.marca} ${cuerda.nombre}`}</Text>

                </View>
                <Text style={styles.body}>
                    {
                        `${cuerda.tipo}\n${cuerda.grosor}\n${cuerda.forma}\n${cuerda.material}`
                    }
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        backgroundColor:'white',
        padding: 10,
    },
    title:{
        fontSize:20,
        marginStart:10,
        marginTop:2,

    },
    body:{
        marginStart:50,
        fontSize:12,
        color:'#898585',
    },
    image:{
        height:20,
        width:20,
        resizeMode:'contain',
        tintColor:'grey',
        marginTop: 5,
    }

});