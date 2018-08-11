import { 
    RECIVE_USER, 
    REQUEST_USER, 
    GET_FECTHED_USER, 
    ADD_USER_DATA, 
    ADD_STRINGS, 
    GET_STRINGS, 
    SET_USER_ORDERS,
    RECIVE_USER_RACKETS,
    UPDATE_ADDRES,
} from "../constants/action-types";
import { 
    getUser , 
    getCuerdas , 
    getUserOrders, 
    uploadOrder, 
    uploadRacket, 
    removeRacket,
    getRackets,
    addUserAddresFirebase,
    getUserAddress,
} from "../../../Utils/firebaseController";
import store from '../store/index';

//--------------------USER--------------------
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
//--------------------RACKET---------------------
export function addUserRacket(racket){
    return {
        type: ADD_USER_DATA.ADD_RACKET,
        payload: racket,
    }
}
export function removeUserRacket(racket){
    return {
        type:ADD_USER_DATA.REMOVE_RACKET,
        payload: racket,
    }
}
export function setFirebaseRackets(rackets){
    return {
        type: RECIVE_USER_RACKETS,
        payload:rackets,
    }
}
export function getUserFirebaseRackets(dispatch,userId){
    return () => {
        return getRackets(userId)
        .then( (rackets) => {
            dispatch(setFirebaseRackets(rackets));
            return rackets;
        })
    }
}
export function removeUserRacketFirebase(dispatch,userId,racket){
    return () => {
        dispatch(removeUserRacket(racket));
        removeRacket(userId,racket);
    }
}
export function addRacketFirebase(dispatch,userId,racket){
    return () => {
        dispatch(addUserRacket(racket));
        uploadRacket(userId,racket);
    }
}
//--------------------ORDER---------------------
export function addUserOrder(order) {
    return {
        type: ADD_USER_DATA.ADD_ORDER,
        payload: order,
    }
}
export function setUserOrder(orders){
    return {
        type: SET_USER_ORDERS,
        payload: orders
    };
}
export function setOrderFromFirebase(dispatch,userId){
    return () => {
        return getUserOrders(userId)
            .then( (orders) => {
                dispatch(setUserOrder(orders));
                return orders;
            })
    }
}

export function addOrderFirebase(dispatch,order){
        return () => {
            dispatch(addUserOrder(order));
            uploadOrder(order);
        }
    
}
//--------------------ADDRES---------------------
export function addUserAddres(addres) {
    const exist = store.getState().addres.find(el => el.id === addres.id) !== null;
    if(exist){
        return {
            type: UPDATE_ADDRES,
            payload: addres,
        }
    }    
    return {
        type:ADD_USER_DATA.ADD_ADDRES,
        payload: addres
    }

}
export function setUserAddres(addresArray){
    return {
        type: GET_FECTHED_USER.GET_USER_ADDRESS,
        payload: addresArray,
    }
}
export function getUserAddressFromFirebase(dispatch,userId){
    return () => {
        return getUserAddress(userId)
            .then( addres => {
                dispatch(setUserAddres(addres));
                return addres;
            })
    }
}

export function addUserAddresToFirebase(dispatch,userId,addres){
    return () => {
        dispatch(addUserAddres(addres));
        addUserAddresFirebase(userId,addres);
    }
}

//--------------------STRING---------------------
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






