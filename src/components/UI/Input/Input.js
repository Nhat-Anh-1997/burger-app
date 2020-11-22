import React from 'react';
import classes from './Input.module.css';
const Input =(props)=>{
  let inputElement=null;
  const inputClass=[classes.inputElement];
  if(props.invalid&&props.shouldValidate&&props.touched)
  {
    inputClass.push(classes.invalid);
  }
  switch (props.elementType){
    case ('input'):
      inputElement=<input 
        className={inputClass.join(' ')}
        value={props.value} 
        {...props.elementConfig}
        
        onChange={props.changed}/>
      break;
    case ('textArea'):
      inputElement=<textarea 
        className={inputClass}
        value={props.value} 
        {...props.elementConfig}
        onChange={props.changed}/>
      break;
    case ('select'):
    inputElement=(
      <select 
        className={inputClass}
        value={props.value} 
        onChange={props.changed} 

        >
        {props.elementConfig.options.map(option=>{
          return <option
            value={option.value}
            key={option.value}> 
          {option.displayValue}
          </option>

        })} 
      </select>

    ) ; break;
    
    
    default:
      inputElement=<input 
        className={inputClass}
        value={props.value} 
        {...props.elementConfig}/>
    
  } //???????
  return(
    <div className={classes.input}>
      <label className={classes.label}>{props.labelName}</label>
      {inputElement}
    </div>
  );
}
export default Input;