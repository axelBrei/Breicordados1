import firebase from 'react-native-firebase';
import { Alert } from 'react-native';

const user = {
  userData: {},
  raquetas: [],
  orders:[],
  addres:[],
}

export async function getRaquetas(firebaseUid) {
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

export function uploadRacket(userId,racket){
  firebase.database()
  .ref('/Usuarios/' + userId + '/Raquetas/' + racket.id)
  .set(racket)
}
