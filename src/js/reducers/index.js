import { 
    RECIVE_USER,
    REQUEST_USER , 
    GET_FECTHED_USER, 
    ADD_USER_DATA, 
    ADD_STRINGS, 
    GET_STRINGS, 
    SET_USER_ORDERS,
    RECIVE_USER_RACKETS,
} from "../constants/action-types";
import React from 'react';

const initialState = {
    isFetching: false,
    fetched: false,
    userData: {},
    raquetas: [],
    orders:[],
    addres:[],
    cuerdas:[],
};
export default function rootReducer(state = initialState, action){
    const { payload } = action;
    switch (action.type){
        //--------------------USER---------------------
        case REQUEST_USER:{
            return {
                ...state,
                isFetching:true
            }
        }
        case RECIVE_USER:{
            return {
                ...state,
                isFetching: false,
                fetched: true,
                userData: payload.clientData,
                raquetas: payload.raquetas,
                addres: payload.addres
            };
        }
        //--------------------RACKET---------------------
        case ADD_USER_DATA.ADD_RACKET:{
            return {
                ...state,
                raquetas: [...state.raquetas, payload],
            }
        }
        case ADD_USER_DATA.REMOVE_RACKET:{
            return {
                ...state,
                raquetas: filter(payload,state.raquetas),
            }
        }
        case RECIVE_USER_RACKETS:{
            return {
                ...state,
                raquetas: payload.reverse(),
            }
        }
        //--------------------ADDRES---------------------
        case ADD_USER_DATA.ADD_ADDRES:{
            return {
                ...state,
                addres: [...state.addres, payload],
            }
        }
        //--------------------ORDER---------------------
        case ADD_USER_DATA.ADD_ORDER:{
            return {
                ...state,
                orders: [...state.orders, payload],
            }
        }
        case SET_USER_ORDERS:{
            return{
                ...state,
                orders: payload,
            }
        }
        //--------------------STRINGS---------------------
        case ADD_STRINGS:{
            return {
                ...state,
                cuerdas: payload,
            }
        }
        //--------------------DEFAULT---------------------
        default:
            return state;
    }
};


function filter(object,array){
    return array.filter(item => item.id !== object.id);
}