import React, { Component } from 'react';
import { Colors } from '../../src/Constants';
import {
    View,
    StyleSheet,
    Alert,
    SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import TextInput from '../Text/TextInput';
import TextInputWithAutComplete from '../Text/TextInputWithAutComplete';
import { validateAddress } from '../../Utils/GooglePlacesVaildator';
import { isValidAddress } from '../../src/Validator';


export default class NewAddresContainer extends React.Component{
    state ={
        addresData: [],
        addres:{
            lat:'',
            lon:'',
            calle:'',
            altura:'',
            barrio:'',
            departamento:'',
        }
    }

    static getDerivedStateFromProps(props,state,prevProps){
        Alert.alert(state.addres + '');
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
                            ...this.state,
                            addresData: result,
                        })
                    }
                })
        }
    }

    onPressItem = (data) => {
        this.setState({
            addres:{
                ...this.state.addres,
                lat: data.lat,
                lon: data.lon,
                calle: data.address.road,
                altura: data.address.house_number,
                barrio: data.address.suburb
            }
        },()=>this.props.handleChanges(this.state.addres))
    }
    onChangeDepartmentText = (text) => {
        this.setState({
            addres:{
                ...this.state.addres,
                departamento: text,
            }
        },()=>this.props.handleChanges(this.state.addres))
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    value={this.state.addres.departamento}
                    onChangeText={this.onChangeDepartmentText}
                    placeholder={'Departamento'}
                    keyboardType={'numeric'}
                />
                <TextInputWithAutComplete 
                    onPressItem={this.onPressItem}
                    maxHeight={100}
                    data={this.state.addresData}
                    placeholder={'Direccion'}
                    onChangeText={(text)=>this.getAddresAndValidate(text)}
                />

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.backgroundWhiteColor,
        padding:20,
        height:'100%',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-end',
    },
    input:{
        marginTop:10,
    }
})