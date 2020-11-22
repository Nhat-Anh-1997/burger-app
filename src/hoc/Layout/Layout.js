import React,{useState} from 'react';
import Auxilliary from '../Auxilliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';
import {connect} from 'react-redux';
const Layout =(props)=>{
    
    const [showSidedraw,setShowSideDraw]=useState(false);
    const openSideDraw =()=>{
        setShowSideDraw(true)
    }
    const closeSideDraw =()=>{
        setShowSideDraw(!showSidedraw);
    }

 

    return(
        <Auxilliary>
            <Toolbar
                isAuth={props.isAuth}
                openSideDraw={openSideDraw}/>
            <SideDraw
                isAuth={props.isAuth}
                open={showSidedraw}
                closed={closeSideDraw}
                clicked={closeSideDraw}
                

            />
            <main className={classes.layout}>
                {props.children}
            </main>
        </Auxilliary>

    )

  
    

}
const mapStateToProps=(state)=>{
    return{
        isAuth:state.auth.token !==null

    }
}
    


export default connect(mapStateToProps)( Layout);