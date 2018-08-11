
export const isValidAddress = (addres) => {
    if(Object.keys(addres).length !== 0){
        for (const key in addres) {
            if (addres.hasOwnProperty(key)) {
                const element = addres[key];
                if(!element ||  element === ''){
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}