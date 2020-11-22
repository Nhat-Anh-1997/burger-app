import React from 'react';
import classes from './Order.module.css';

const Order =(props)=>{
  const ingredients=[];
  for(let ingredientName in props.ingredients)
  {
    ingredients.push(
      {
        name:ingredientName,
        amount:props.ingredients[ingredientName]
      }
    )
  } //???????????????????????????????
  const ingredientsOutput=ingredients.map(ig=>{
    return <span
        style={
          {
            textTransform:"capitalize",
            border:"1px solid #ccc",
            margin:"0px 3px",
            padding:"1px",
            display:"inline-block"
          }
        }
       
        key={ig.name+1} >

        {ig.name} 
        ({ig.amount})
       
      </span>;
  })
  return(
  <div className={classes.Order}>
    <p>Ingredient:{ingredientsOutput}</p>
    <p>Price:<strong>{props.price} USD</strong></p>
    
  </div>
  );
}

export default  Order;