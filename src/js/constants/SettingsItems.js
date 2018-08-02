export const items = (userData) => {

    return [
        { placeholder:'Nombre', data:userData.nombreYApellido},
        { placeholder:'Mail', data:userData.mail},
        { placeholder:'Telefono', data:userData.telefono}
      ]
};

export const address = () => {
    let addres = [
        {placeholder: 'Nueva Direccion', data: ''},
        {placeholder: 'casa', data: '1'}
    ]
    return addres;
};

export const sections= (userData) => {

    return [
        {key: 'userData', data: items(userData)},
        {key: 'Direcciones', data: address()}
      ]
}