import { RECIVE_USER, REQUEST_USER , GET_FECTHED_USER, ADD_USER_DATA, ADD_STRINGS, GET_STRINGS} from "../constants/action-types";
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
                orders: payload.orders,
                addres: payload.addres
            };
        }
        case GET_FECTHED_USER.GET_USER_DATA:{
            return state.userData;
        }
        case GET_FECTHED_USER.GET_USER_ADDRESS:{
            return state.addres;
        }
        case GET_FECTHED_USER.GET_USER_ORDERS:{
            return state.orders;
        }
        case GET_FECTHED_USER.GET_USER_RACKETS:{
            return state.raquetas;
        }
        case ADD_USER_DATA.ADD_RACKET:{
            return {
                ...state,
                raquetas: state.raquetas.push(payload)
            }
        }
        case ADD_USER_DATA.ADD_ADDRES:{
            return {
                ...state,
                addres: state.addres.push(payload)
            }
        }
        case ADD_USER_DATA.ADD_ORDER:{
            return {
                ...state,
                orders: state.orders.push(payload)
            }
        }
        case ADD_STRINGS:{
            return {
                ...state,
                cuerdas: action.payload,
            }
        }

        default:
            return state;
    }
};
