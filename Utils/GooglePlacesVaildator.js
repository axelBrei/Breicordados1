import { Alert } from 'react-native';

const apiKey = 'AIzaSyCo_H6_DBwR0w295K_a-F-s0NdYFVNnVqI';
const url = 'https://nominatim.openstreetmap.org/search?q=';
const option = '&format=json&addressdetails=1&limit=8';
const CABA = ', CABA';
export function validateAddress(addres){
    const query = addres + CABA;    
     return fetchAddres(query)
         .then((response) => {
            return response
        }).catch((error) => { 
            Alert.alert(error.message + ' ');
        });

}



export async function fetchAddres(addres){
    return await fetch(url + addres + option)
    .then((response) => {
        return response.json();
    })
    .catch(err => {
        const error = err;
        Alert.alert(error.message + ' ');
    })
}