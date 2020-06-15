import React from 'react';
import classes from './Input.css'

const Input = props => (
<input 
 onChange={(props.onChange)}
 type = {props.type} 
 placeholder ={props.placeholder} 
 className={classes.Inputs}
 value = {props.value}/>
);
    

export default Input;