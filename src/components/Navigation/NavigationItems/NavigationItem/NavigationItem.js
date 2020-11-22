import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';
const NavigationItem =(props)=>(
    <div className={classes.navigationItem}>
        <li> 
            <NavLink 
                to={props.link}
                className={props.active? "active ": null}
                activeClassName={classes.active}
                exact={props.exact}
                >{props.children}
            </NavLink>
        </li>

    </div>
    
)
export default NavigationItem;