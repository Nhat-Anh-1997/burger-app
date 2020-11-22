import React from 'react';
import classes from './SideDrawTongger.module.css';
const SideDrawTongger =(props)=>{
  return(
    <div className={classes.drawerToggle} onClick={props.openSideDraw}>
      <div></div>
      <div></div>
      <div></div>
      

    </div>
  );
}
export default SideDrawTongger;