import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../../src/Constants';
import { swipeableContentAddresItem } from '../../src/js/constants/raquetasCellSwipeContent';
import Swipeable from 'react-native-swipeable';
import { ic_edit } from '../../Images/Images';

const ItemAddres = ({onPress,title, source, data, index}) => {
    
    if(index === 0){
        return (
            <TouchableOpacity onPress={()=> {onPress(index,data)}}>
                <View style={styles.container}>
                    <Image 
                    source={source} 
                    style={styles.image}
                    />
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <Swipeable
            contentContainerStyle={styles.swipeable}
            rightButtons={swipeableContentAddresItem(onPress,index,data)}
            rightButtonWidth={80}>
                <View style={styles.container}>
                    <Image 
                    source={source} 
                    style={styles.image}
                    />
                    <Text style={styles.text}>{title}</Text>
                </View>
        </Swipeable>
    );
}
        



export default ItemAddres;



const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems: 'center',
    },
    swipeable:{
        justifyContent:'center',
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