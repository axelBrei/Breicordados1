import {StyleSheet, TouchableOpacity , View, Text, Image, Alert} from "react-native";
import {ic_racket} from "../../Images/Images";
import React from "react";
import Swipeable from 'react-native-swipeable';
import { swipeableContent } from '../../src/js/constants/raquetasCellSwipeContent';

export default class ItemRaqueta extends React.Component{
    onPressItem = (index) => {
        switch(index){
            case 0:{
                this.props.onDeleteSwipe(this.props.raqueta)
                break;
            }
            case 1:{
                Alert.alert('index 2');
                break;
            }
            default: break;
        }
    }
    render() {
        const {raqueta} = this.props;
        return (
            <Swipeable
                contentContainerStyle={styles.swipeable}
                rightButtonWidth={100}
                rightButtons={swipeableContent(this.onPressItem).right}>
                <View style={styles.container}>
                    <Image source={ic_racket}
                        style={styles.image}/>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:18}}>{`${raqueta.marca} ${raqueta.modelo}`} </Text>
                        <Text style={{color: '#898585'}}>
                            {
                                 `Peso: ${raqueta.peso}gr.\nPatron: ${raqueta.patron}\nGrip: ${raqueta.grip}`
                            }
                        </Text>
                    </View>
                </View>
            </Swipeable>
        );
    }
}
const styles = StyleSheet.create({
    swipeable:{
        justifyContent:'center',
        flex:1,
        paddingVertical:10,
        paddingHorizontal:25,
    },
    container:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center',
    },
    textContainer:{
        flex:1,
        marginStart:10,
        justifyContent:'flex-start',
        color: '#000',
    },
    image:{
        height:30,
        width:30,
        resizeMode:'contain',
        alignSelf:'center',

    },
})