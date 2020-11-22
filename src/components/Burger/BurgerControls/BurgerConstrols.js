import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import classes from './BurgerControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];
const BurgerControls =(props)=>(
    <div className={classes.buildControls}>
        <p><strong>Price:{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl,index)=>{
        return (
            
            <BurgerControl 
            key={index}
            label={ctrl.label}
            added={()=>props.add(ctrl.type)}
            removed={()=>props.remove(ctrl.type)} 
            disabled={props.disable[ctrl.type]}/>

        )
        })}
        <button 
            className={classes.orderButton}
            onClick={props.order}
            disabled={!props.disabled}
            >{props.isAuth?'OrderNow':'SignUp to Order'}
        </button>
        

    </div>
    
   
    
    

    
   
)
export default BurgerControls;