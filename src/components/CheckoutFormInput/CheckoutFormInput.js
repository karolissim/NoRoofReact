import React from 'react'
import { COUNTRIES } from '../../constants/Countries'

const CheckoutFormInput = React.forwardRef((props, ref) => {
    function handleOnFocusGained(ref) {
        ref.classList.add('focused')
        ref.classList.remove('invalid')
    }

    function handleOnFocusLost(ref) {
        ref.classList.remove('focused')
    }

    function handleOnKeyUp(ref) {
        if (ref.value.length === 0) {
            ref.classList.add('empty')
        } else {
            ref.classList.remove('empty')
        }
    }

    return (
        <div className={props.class}>
            {!props.isCountryPicker ? (
                <input
                    className="input empty"
                    type="text"
                    placeholder={props.placeholder}
                    ref={ref}
                    onFocus={() => handleOnFocusGained(ref.current)}
                    onBlur={() => handleOnFocusLost(ref.current)}
                    onKeyUp={() => handleOnKeyUp(ref.current)}>
                </input>
            ) : (
                    <select
                        className="input empty"
                        onChange={(event) => props.handleCountrySelect(event)}
                        ref={ref}>
                        <option></option>
                        {COUNTRIES.map((country) => {
                            return <option value={country.code} key={country.code}>{country.name}</option>
                        })}
                    </select>
                )}

            <label className="info-label">{props.label}</label>
            <div className="baseline"></div>
        </div>
    )
})

export default CheckoutFormInput