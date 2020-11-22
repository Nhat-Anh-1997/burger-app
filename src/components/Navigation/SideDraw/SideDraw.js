import React from 'react';
import classes from './SideDraw.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Auxilliary from '../../../hoc/Auxilliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../UI/Logo/Logo';

const SideDraw=(props)=>{
    let assignedClass=[classes.sideDraw,classes.close];
    if(props.open){
        assignedClass=[classes.sideDraw,classes.open];
    }
    
    return(
        <Auxilliary>
            
        <Backdrop show={props.open}click={props.closed}/>
        <div className={assignedClass.join(" ")} onClick={props.clicked}>
            <div className={classes.logo}>
                <Logo/>
            </div>
        
            
       
            <nav>
                <NavigationItems isAuthed={props.isAuth}/>
            </nav>

        </div>
        




    </Auxilliary>
    

    )
}
   

export default SideDraw;