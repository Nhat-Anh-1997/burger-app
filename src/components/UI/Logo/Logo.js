import React from 'react';
import BurgerImage from '../../../assit/images/burger-logo.png';
import classes from './Logo.module.css';
const Logo =(props)=>(
    
        <img className={classes.logo} src={BurgerImage} alt="Burger" />
   
    
);
export default Logo;