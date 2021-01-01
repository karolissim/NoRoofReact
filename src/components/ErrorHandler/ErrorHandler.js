import React, { useEffect } from 'react';
import "./ErrorHandler.css";

const ErrorHandler = (props) => {
    const style = props.isActive ? 'block' : 'none' ;

    useEffect(() =>{
        const timer = setTimeout(() => {
            props.setLimitReached(false);
        }, 70000);

        return () => clearTimeout(timer);
    });
    
    return (
        <div className = "error" style = {{display: style}}>
            <div className = "text">{props.message}</div>
        </div> 
    );
}

export default ErrorHandler