export const items = (userData) => {

    return [
        { placeholder:'Nombre', data:userData.nombreYApellido},
        { placeholder:'Mail', data:userData.mail},
        { placeholder:'Telefono', data:userData.telefono}
      ]
};

export const address = (array) => {
    let addres = [
        {placeholder: 'Nueva Direccion', data: ''},
    ]
    array.forEach(element => {
        addres.push(element)
    });    
    return addres;
};

export const sections= (userData,addres) => {

    return [
        {key: 'userData', data: items(userData)},
        {key: 'Direcciones', data: address(addres)}
      ]
}