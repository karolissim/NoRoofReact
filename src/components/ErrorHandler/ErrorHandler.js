import React, { useEffect } from 'react';
import "./ErrorHandler.css";

const ErrorHandler = (props) => {
    const style = props.isActive ? 'block' : 'none' ;

    useEffect(() =>{
        console.log(props.isActive);
        let si = props.isActive ? props.setErrorDisplay(true) : "";
        const timer = setTimeout(() => {
            props.setLimitReached(false);
            props.setErrorDisplay(false);
            console.log("error off")
        }, 7000);

        return () => clearTimeout(timer);
    });
    
    return (
        <div className = "error" style = {{display: style}}>
            <div className = "text">{props.message}</div>
        </div> 
    );
}

export default ErrorHandler