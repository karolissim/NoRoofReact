import { POSTAL_CODES } from '../constants/PostalCodesRegex'

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePostalCode(country, postalCode) {
    let re = new RegExp(POSTAL_CODES[country])
    return re.test(String(postalCode))
}
