import {StyleSheet, TouchableOpacity , View, Text, Image, Alert} from "react-native";
import {ic_racket} from "../../Images/Images";
import React from "react";
import Swipeable from 'react-native-swipeable';

export default class ItemRaqueta extends React.Component{
    onDeleteSwipe(){
        this.props.onDeleteSwipe(this.props.raqueta);
    }
    render() {
        const {raqueta} = this.props;
        return (
            <Swipeable
                onRightActionRelease={this.onDeleteSwipe.bind(this)}
                rightActionActivationDistance={150}
                leftContent={(
                    <TouchableOpacity>
                        <View style={[styles.rigthBtnBackground, {backgroundColor:'green',alignItems:'flex-end'}]}>
                            <Text style={styles.rigthBtnText}>Editar</Text>
                        </View>
                    </TouchableOpacity>
                )}
                rightContent={(
                    <TouchableOpacity>
                        <View style={[styles.rigthBtnBackground, { backgroundColor: 'red',alignItems:'flex-start'}]}>
                            <Text style={styles.rigthBtnText}>Eliminar</Text>
                        </View>
                    </TouchableOpacity>
                )}>
                <View style={styles.container}>
                    <Image source={ic_racket}
                        style={styles.image}/>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:18}}> {`${raqueta.marca} ${raqueta.modelo}`} </Text>
                        <Text style={{marginStart:15, color: '#898585'}}>
                            {
                                `Peso: ${raqueta.peso}\nPatron: ${raqueta.patron}\nGrip: ${raqueta.grip}`
                            }
                        </Text>
                    </View>
                </View>
            </Swipeable>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        padding:10,
        paddingTop: 15,
    },
    image:{
        height:30,
        width:30,
        resizeMode:'contain',
        marginStart:10,
        marginTop:15,

    },
    textContainer:{
        flex:1,
        marginStart:10,
        flexDirection:'column',
        justifyContent:'flex-start',
        color: '#000',
    },
    rigthBtnBackground:{
        height:108,
        justifyContent:'center',
        padding:15,
        margin:4,
    },
    rigthBtnText:{
        color:'#ffffff',
        fontSize:20,
    },
})