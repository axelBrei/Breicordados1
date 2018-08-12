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
        addresValue: '',
        addres:{
            id:'',
            lat:'',
            lon:'',
            calle:'',
            altura:'',
            barrio:'',
            departamento:'',
        }
    }

    componentDidMount(){
        if(Object.keys(this.props.data).length !== 0){
            this.setState({
                ...this.state,
                addres: this.props.data,
                addresValue: this.getAddresValue(this.props.data),
            })
        }
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
        const { id } = this.state.addres;
        const uuidV1 = require('uuid/v1');
        this.setState({
            addres:{
                ...this.state.addres,
                id: id !== '' ? id: uuidV1(),
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

    getAddresValue = (data) =>{
        return data.calle + ' ' + data.altura + ' ' + data.departamento + ' ' + data.barrio;
        
    }

    render() {
        const { state, props } = this;
        return (
            <View style={styles.container}>
                <TextInput 
                    value={state.addres.departamento}
                    onChangeText={this.onChangeDepartmentText}
                    placeholder={'Departamento'}
                    keyboardType={'numeric'}
                />
                <TextInputWithAutComplete 
                    value={state.addresValue}
                    onPressItem={this.onPressItem}
                    maxHeight={100}
                    data={state.addresData}
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