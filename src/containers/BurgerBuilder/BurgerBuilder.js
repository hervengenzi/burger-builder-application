import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    salad: 0.3,
    cheese: 0.2,
    meat: 1.1,
    bacon: 1.2
};
class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    };

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceSubstraction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubstraction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    };

    updatePurchasable(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    updatePurchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
        render(){
            const disabledInfo = {
                ...this.state.ingredients
            };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0
            };

            // {salad: 'true', cheese: 'false',....}
            return(
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        <OrderSummary ingredients={this.state.ingredients} />
                    </Modal>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientsAdded={this.addIngredientsHandler}
                        ingredientRemoved={this.removeIngredientsHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.updatePurchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
        }
}


export default BurgerBuilder;