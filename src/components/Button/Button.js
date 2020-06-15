import React from 'react';
import classes from './Button.css'

const Button = props =>(
    <button 
    className = {classes.Btns} 
    onClick = {props.clicked}>{props.children}</button>
) 

export default Button;