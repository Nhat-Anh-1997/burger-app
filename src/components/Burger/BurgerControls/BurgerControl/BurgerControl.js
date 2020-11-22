import React from 'react';
import classes from './BurgerControl.module.css';
const BurgerControl =(props)=>(
    <div className={classes.buildControl}>
        <label className={classes.label}>{props.label}</label>
        <button 
            className={classes.less}
            onClick={props.removed}
            disabled={props.disabled}
            >Less
        </button>

        <button 
            className={classes.more}
            onClick={props.added}
            >More
        </button>

    </div>

)
export default BurgerControl;