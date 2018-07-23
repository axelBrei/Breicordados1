import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

export default class UserInfo extends React.Component{

    onPress(){
        this.props.onPress(this.props.placeholder)
    }

    render() {
        const { placeholder, data} = this.props;
        return (
            <TouchableWithoutFeedback 
            onPress={this.onPress.bind(this)}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.placeholder}</Text>
                    <Text style={styles.info}>{
                        data ? data : '-'
                    }</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        height: 70,
        justifyContent: 'center',
        paddingStart: 20,

    },
    title:{
        color:'#898585',
        fontSize:14,
    },
    info:{
        color:'#898585',
        fontSize:18,
    },
})