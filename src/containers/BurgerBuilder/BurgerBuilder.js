import React,{Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerConstrols';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Auxilliary from '../../hoc/Auxilliary';
import {connect} from 'react-redux';
import *as actionCreators from '../../store/action/index';


class BurgerBuilder extends Component{
    state={
        
        purchasing:false,
        loadding:false,
        error:false,
        purchable:false,
        
    }
    componentDidMount(){  
        this.props.onInitIngredients(); 
    }
    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    purchasingHandler=()=>{
        if(this.props.isAuthed){
            this.setState({purchasing:true})
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');

        }
        
    }

    continueButton =()=>{
        this.props.history.push('/checkout');
        this.props.onInit();  
    }
    
    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary=null;
        let burger=this.props.error?<p>Ingredient can't be loaded! </p>:<Spinner/>
        if(this.props.ings){
            burger =(
                <Auxilliary>
                    <Burger
                        ingredients={this.props.ings}
                    />
                    <BurgerControls
                        order={this.purchasingHandler}
                        add={(ingName)=>this.props.onIngredientAdded(ingName)} 
                        remove={(ingName)=>this.props.onIngredientRemoved(ingName)}
                        price={this.props.price}
                        disable={disabledInfo}
                        disabled={this.updatePurchaseState(this.props.ings)}
                        isAuth={this.props.isAuthed}
                    />
                </Auxilliary>        
            ) 
            orderSummary= <OrderSummary
            ingredients={this.props.ings}
            cancel={this.purchasingHandler}
            price={this.props.price}
            continue={this.continueButton}/>
        }
        if(this.state.loadding)
        {
            orderSummary=<Spinner/> ;
        }
      
        
        return(   
            <div>
                <Modal
                    show={this.state.purchasing}
                    close={this.purchasingHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.bur.ingredients,
        price:state.bur.totalPrice,
        error:state.bur.error,
        purchase:state.ord.purchase,
        isAuthed:state.auth.token!==null
       
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(actionCreators.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actionCreators.initIngredient()),
        onInit:()=>dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actionCreators.setAuthRedirectPath(path))
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios)) ;