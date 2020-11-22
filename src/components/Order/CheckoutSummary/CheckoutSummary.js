import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const CheckoutSummary =(props)=>{
  return(
    <div className={classes.checkoutSummary}>
      <h1> We hope it tastes well!</h1>
      <div style={{width:'100%' , height:'400px', margin:'auto' }}>
        <Burger ingredients={props.ingredients}/>

      </div>
      <Button 
        buttontype='danger'
        clicked={props.checkoutCancel}>Cancel</Button>
      <Button 
        buttontype='success'
        clicked={props.checkoutContinue}>Continue</Button>
        
    </div>
  );
}
export default CheckoutSummary;