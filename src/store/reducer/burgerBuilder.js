import * as actionTypes from '../action/actionTypes';
import {updateObject} from '../utility';
const initialState={
  ingredients:null,
  totalPrice:4,
  error:false,
  building:false
}
const INGREDIENTS_PRICE={
  salad:0.5,
  bacon:0.7,
  cheese:1,
  meat:1.5
}
const addIngredient=(state,action)=>{
  const updateIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]+1 }
  const updateIngredients=updateObject(state.ingredients,updateIngredient)
  const updateState={
    ingredients:updateIngredients,
    totalPrice:state.totalPrice+INGREDIENTS_PRICE[action.ingredientName],
    building:true
  }
  return updateObject(state,updateState)

}
const removeIngredient=(state,action)=>{
  const updateIngre={[action.ingredientName]:state.ingredients[action.ingredientName]-1 }
  const updateIngres=updateObject(state.ingredients,updateIngre)
  const updateSt={
    ingredients:updateIngres,
    totalPrice:state.totalPrice+INGREDIENTS_PRICE[action.ingredientName],
    building:true
  }
  return updateObject(state,updateSt)

}

const setIngredient=(state,action)=>{
  return updateObject(state,{
    ingredients:action.ingredients,
    totalPrice:4,
    error:false,
    building:false
  })

}
const fetchIngredientFailed=(state,action)=>{
  return updateObject(state,{error:true})

}
const reducer=(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:return addIngredient(state,action)  
    case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action)
    case actionTypes.SET_INGREDIENT:return setIngredient(state,action)
    case actionTypes.FECTCH_INGREDIENT_FAILED:return fetchIngredientFailed(state,action)
    default:
      return state;
  }
  

}
export default reducer;