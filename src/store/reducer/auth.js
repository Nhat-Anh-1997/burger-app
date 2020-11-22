import *as actionTypes from '../action/actionTypes';
import {updateObject} from '../utility';

const initilityState={
  token:null,
  userId:null,
  error:null,
  loading:false,
  authRedirect:'/'
}

const authLogout=(state,action)=>{
  return updateObject(state,{token:null,userId:null})
}
const authStart=(state,action)=>{
  return updateObject(state,{error:null,loading:true});
}
const authSuccess=(state,action)=>{
  return updateObject(state,{
    loading:false,
    token:action.token,
    userId:action.userId,
    error:null
  })
}
const authFail=(state,action)=>{
  return updateObject(state,{error:action.error,loading:false})
}

const setAuthRedirectPath=(state,action)=>{
  return updateObject(state,{authRedirect:action.path})
}
const reducer=(state=initilityState,action)=>{
  switch(action.type)
  {
    case actionTypes.AUTH_START:return authStart(state,action);
    case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);
    case actionTypes.AUTH_FAIL:return authFail(state,action);
    case actionTypes.AUTH_LOGOUT:return authLogout(state,action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:return setAuthRedirectPath(state,action);
    
  
    default:return state;
  }
}
export default reducer;