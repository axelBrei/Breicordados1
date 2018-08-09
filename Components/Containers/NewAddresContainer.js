import React, { Component } from 'react';
import { Colors } from '../../src/Constants';
import {
    View,
    StyleSheet,
    Alert,
    SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import TextInputWithAutComplete from '../Text/TextInputWithAutComplete';
import { validateAddress } from '../../Utils/GooglePlacesVaildator';
import TextInput from '../../Components/Text/TextInput';


export default class NewAddresContainer extends Component{
    state ={
        addresData: [],
    }

    getAddresAndValidate = (addres) => {
        if(addres.length >= 6){
            validateAddress(addres)
                .then( (addresList) => {
                    const result = addresList.filter( (item) => {
                        return item.address.house_number;
                    })
                    if(result.length > 0){
                        this.setState({
                            addresData: result,
                        })
                    }
                })
        }
        
    }

    onPressItem = (data) => {
        // TODO GET LAT & LONG FROM DATA
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TextInputWithAutComplete 
                    onPressItem={this.onPressItem}
                    maxHeight={100}
                    data={this.state.addresData}
                    placeholder={'Direccion'}
                    onChangeText={(text)=>this.getAddresAndValidate(text)}
                />


            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.backgroundWhiteColor,
        padding:20,
        height:'100%',
    },
    input:{
        marginTop:10,
    }
})