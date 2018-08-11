import firebase from 'react-native-firebase';
import { Alert } from 'react-native';

const user = {
  userData: {},
  raquetas: [],
  orders:[],
  addres:[],
}
//-------------RACKETS------------------
export async function getRackets(firebaseUid) {
  const snapshot = await firebase.database().ref('/Usuarios/' + firebaseUid + '/Raquetas').once();
  let raquetas = [];
  const value = snapshot.val();
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const element = value[key];
      raquetas.push(element);
    }
  }
  return raquetas;
}

export function uploadRacket(userId,racket){
  firebase.database()
  .ref('/Usuarios/' + userId + '/Raquetas/' + racket.id)
  .set(racket)
}

export function removeRacket(userId,racket){
  firebase.database()
  .ref('/Usuarios/' + userId + '/Raquetas/' + racket.id)
  .set(null)
}
// ------------------STRINGS-----------------

export async function getCuerdas(){
  const snapshot = await firebase.database().ref('/Cuerdas').once();
  const value = snapshot.val();
  let cuerdas = [];
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const element = value[key];
      cuerdas.push(element);
    }
  }
  return cuerdas;
}
//----------------------USER DATA---------------------

export async function getUser(firUId){
  const snapshot = await firebase.database().ref('/Usuarios/' + firUId).once();
  const value = snapshot.val().Raquetas;
  user.clientData = snapshot.val().clientData;
  let raquetas = [];
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const element = value[key];
      raquetas.push(element);
    }
  }
  user.raquetas = raquetas;
  return user;
}

export function uploadUser(user){
  firebase.database()
  .ref('/Usuarios/' + user.id + '/clientData')
  .set(user);
}

//---------------------ORDERS-------------------------

export function uploadOrder(order){
  firebase.database()
  .ref('/Pedidos/' + order.orderId)
  .set(order);
}

export async function getUserOrders(userId){
  const snapshot = await firebase.database()
  .ref().child('Pedidos')
  .orderByChild('userId')
  .equalTo(userId)
  .once();
  const value = snapshot.val();
  let pedidos = [];
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const element = value[key];
      pedidos.push(element);
    }
  }
  return pedidos;
}

// ------------------------ADDRESS--------------------
export async function getUserAddress(userId){
  const snapshot = await firebase.database()
  .ref('/Usuarios/' + userId + '/Direcciones')
  .once();
  const value = snapshot.val();
  let result = [];
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const element = value[key];
      result.push(element);
    }
  }
  return result;
}

export function addUserAddresFirebase(userId,addres){
  firebase.database()
  .ref('/Usuarios/' + userId + '/Direcciones/' + addres.id)
  .set(addres);
}