import { RECIVE_USER, REQUEST_USER, GET_FECTHED_USER, ADD_USER_DATA, ADD_STRINGS, GET_STRINGS, SET_USER_ORDERS} from "../constants/action-types";
import { getUser , getCuerdas , getUserOrders, uploadOrder, uploadRacket} from "../../../Utils/firebaseController";

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

export function setUserOrder(orders){
    return {
        type: SET_USER_ORDERS,
        payload: orders
    };
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

export function setOrderFromFirebase(dispatch,userId){
    return () => {
        return getUserOrders(userId)
            .then( (orders) => {
                dispatch(setUserOrder(orders));
            })
    }
}

export function addOrderFirebase(dispatch,order){
        return () => {
            dispatch(addUserOrder(order));
            uploadOrder(order);
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

export function addRacketFirebase(dispatch,userId,racket){
    return () => {
        dispatch(addUserRacket(racket));
        uploadRacket(userId,racket);
    }
}
