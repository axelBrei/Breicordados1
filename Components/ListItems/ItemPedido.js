import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { ic_order_item } from '../../Images/Images';
import { Colors } from '../../src/Constants';

export default class ItemPedido extends React.Component{

    statusColor = (status) => {
        switch (status.toLowerCase()){
            case 'encordando':{
                return Colors.primaryDrakColor;
            }
            case 'recibida':{
                return 'orange';
            }
            default: return Colors.lightGreen;
        }
    }

    render() {
        const { cuerda , raqueta } = this.props.data;
        const { data } = this.props;
        const statusColor = this.statusColor(data.status);
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={ic_order_item} style={styles.image}/>
                    <View 
                    style={[styles.statusContainer,
                        {backgroundColor: statusColor}
                    ]}
                />
                </View>
                
                <View style={styles.description}>
                    <Text style={styles.title}>{`${raqueta.marca} ${raqueta.modelo}`}</Text>
                    <Text>
                        {
                            `Cuerda: ${cuerda.marca} ${cuerda.nombre} ${cuerda.grosor}\nTension: ${data.tension}`
                        }
                    </Text>
                </View>    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        paddingStart:15,
        paddingEnd:20,
        flexDirection: 'row',
        alignItems:'center',
        padding:10,
    },
    description:{
        paddingStart:15,
    },
    imageContainer:{
        alignItems:'center',
        justifyContent: 'center',
        height:'60%',
        width:'10%',
        flexDirection:'row',
        },
    title:{
        fontSize:22,
    },
    statusContainer:{
        position: 'absolute',
        alignSelf: 'center',
        borderRadius:15,
        width:10,
        height:10,
    },
    image:{
        height:'100%',
        width:'100%',
        resizeMode: 'contain',
        tintColor: 'grey',
        marginBottom:7,
    },
})