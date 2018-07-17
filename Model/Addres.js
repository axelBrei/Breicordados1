export default class Addres {
  constructor(){
    this.nombreId = '',
    this.street = '',
    this.city = '',
    this.streetNumber = '',
    this.departamento = '',
    this.neighbour = '',
    this.zipCode = ''
  }

  toString(){
    return this.nombreId + ' ' + this.zipCode;
  }
}
