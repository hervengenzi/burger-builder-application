import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.3,
    cheese: 0.2,
    meat: 1.1,
    bacon: 1.2
};
class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        axios.get('https://burger-builder-1c037.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
              this.setState({error: true});
            });
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

    purchaseCOntinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Ngenzi Herve',
                address: {
                    street: 'KK 19 GT',
                    zipCode: '32356',
                    country: 'Rwanda',
                },
                email: 'herve@octan.group',
            },
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order)
        .then(response => {
           this.setState({ loading: false, purchasing: false });
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
        })
    }
        render(){
            const disabledInfo = {
                ...this.state.ingredients
            };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0
            };

            let orderSummary = null;

            let burger = <Spinner />
            if (this.state.ingredients) {
                burger = (
                    <Aux>
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
                orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseCOntinueHandler} />;
            }
            // {salad: 'true', cheese: 'false',....}

            if(this.state.loading) {
                orderSummary = <Spinner />
            }

            return(
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal>
                    {burger}
                </Aux>
            );
        }
}


export default withErrorHandler(BurgerBuilder, axios);