
import './App.css';
import { useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/Logout';
import {connect} from 'react-redux';
import * as actionCreators from './store/action/index';

const App=props=>{

  useEffect(()=>{
    props.onAuthCheckState();
  })
  
  let route=(
    <Switch>
      <Route path='/'exact component={BurgerBuilder}/>
      <Route path='/auth' component={Auth}/>
      <Redirect to='/'/> 
    </Switch>
  );
  if(props.isAuthed){
    route=(
      <Switch>
        <Route path='/'exact component={BurgerBuilder}/>
        <Route path='/auth' component={Auth}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/logout' component={Logout }/>
        <Redirect to='/'/>
      </Switch>
    );
  }
  return(
    <div >
      <Layout>
        {route}
      </Layout>
    </div>
  )
  
}
const mapStateToProps=(state)=>{
  return{
    isAuthed:state.auth.token!==null
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onAuthCheckState:()=>dispatch(actionCreators.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App) )  ;
