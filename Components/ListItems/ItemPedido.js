import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class ItemPedido extends React.Component{

    statusColor(status){
        switch (status.toLowerCase()){
            case 'encordando':{
                return 'red';
            }
            case 'recibiendo':{
                return 'red';
            }
            default: return 'green';
        }
    }

    render() {
        const { cuerda , raqueta } = this.props.data;
        const { data } = this.props;
        const statusColor = this.statusColor(data.status);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`${raqueta.marca} ${raqueta.modelo}`}</Text>
                <Text style={styles.description}>
                    {
                        `Cuerda: ${cuerda.marca} ${cuerda.nombre} ${cuerda.grosor}\nTension: ${data.tension}`
                    }
                </Text>
                <View style={styles.statusContainer}>
                    <Text style={styles.status}>Status:</Text>
                    <Text style={{color: statusColor,width:80}}>{data.status}</Text>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height: 120,
        paddingStart:15,
        paddingTop:15,
        paddingEnd:5,
        borderBottomWidth:1,
        borderColor:'#A8A0A0',
    },
    title:{
        fontSize:22,

    },
    description:{
        marginStart:10,
    },
    statusContainer:{
        position:'absolute',
        right:20,
        bottom: 10,
        flexDirection:'row',
    },
    status:{
        marginEnd:5,
    }
})