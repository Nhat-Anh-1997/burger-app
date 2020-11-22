import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
const NavigationItems =(props)=>(
    <ul className={classes.navigationItems}>
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
        {props.isAuthed?<NavigationItem link="/orders" >Orders</NavigationItem>:null}
        {props.isAuthed
            
            ?<NavigationItem link="/logout" >Logout</NavigationItem>
            :<NavigationItem link="/auth" >Auth</NavigationItem>
            }
    </ul>

)
export default NavigationItems;