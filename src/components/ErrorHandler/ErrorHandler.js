import React from 'react';
import "./ErrorHandler.css";

const ErrorHandler = (props) => {
    const style = props.isActive ? 'block' : 'none' 
    return (
        <div className = "error" style = {{display: style}}>
            <a className = "close-error replace" onClick = {() => props.setLimitReached(false, null)}>Remove</a>
            <div className = "text">{props.message}</div>
            
            
        </div> 
    );
}

export default ErrorHandler