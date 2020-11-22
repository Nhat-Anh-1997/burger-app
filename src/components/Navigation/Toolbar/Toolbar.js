import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';
import SideDrawTongger from '../SideDraw/SideDrawTongger/SideDrawTongger';

const Toolbar = (props) =>(
    <header className={classes.toolbar}>
        
        
        
        <SideDrawTongger openSideDraw={props.openSideDraw}/>
        
        <div className={classes.logo }>
            <Logo />

        </div>
        

       
        <nav className={classes.desktopOnly}>
            <NavigationItems isAuthed={props.isAuth}/>

        </nav>
    



    </header>
)
export default Toolbar;