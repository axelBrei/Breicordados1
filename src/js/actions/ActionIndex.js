import { RECIVE_USER, REQUEST_USER, GET_FECTHED_USER, ADD_USER_DATA, ADD_STRINGS, GET_STRINGS} from "../constants/action-types";
import firebase from 'react-native-firebase';
import { getUser , getCuerdas } from "../../../Utils/firebaseController";

export function reciveUser(user) {

    return {
        type: RECIVE_USER,
        payload: user
    };
};
export function requestUser(){
    return {
        type: REQUEST_USER,
    };
};
export function addUserRacket(racket){
    return {
        type: ADD_USER_DATA.ADD_RACKET,
        payload: racket,
    }
}
export function addUserOrder(order) {
    return {
        type: ADD_USER_DATA.ADD_ORDER,
        payload: order,
    }
}
export function addUserAddres(addres) {
    return {
        type:ADD_USER_DATA.ADD_ADDRES,
        payload: addres,
    }
}
export function getUserData(){
    return {
        type: GET_FECTHED_USER.GET_USER_DATA,
    }
}
export function getUserRackets() {
    return {
        type: GET_FECTHED_USER.GET_USER_RACKETS,
    }
}
export function getUserOrders() {
    return {
        type: GET_FECTHED_USER.GET_USER_ORDERS,
    }
}
export function getUserAddres() {
    return {
        type: GET_FECTHED_USER.GET_USER_ADDRESS,
    }
}

export function addString(string){
    return {
        type: ADD_STRINGS,
        payload: string
    }
}


export function setStrings(dispatch){
    return ()=> {
        return getCuerdas()
        .then( (cuerdas) => {
            dispatch(addString(cuerdas));
            return cuerdas;
        })
    }
}

export function setUserFromFirebase(dispatch,firUId){
    return () => {
        dispatch(requestUser());
        return getUser(firUId)
            .then( (snapshot) => {
                dispatch(reciveUser(snapshot));
                return snapshot;
            })
    }
}
