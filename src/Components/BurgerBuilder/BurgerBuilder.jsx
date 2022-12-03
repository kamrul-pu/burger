import React from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Summary from "./Summary/Summary";
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchaseable } from '../../Redux/actionCreators';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 50,
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (igType) => dispatch(addIngredient(igType)),
        removeIngredient: (igType) => dispatch(removeIngredient(igType)),
        updatePurchaseable: () => dispatch(updatePurchaseable()),
    }
}

class BurgerBuilder extends React.Component {
    state = {
        // ingredients: [
        //     { type: 'salad', amount: 0 },
        //     { type: 'cheese', amount: 0 },
        //     { type: 'meat', amount: 0 },
        // ],
        // totalPrice: 80,
        modalOpen: false,
        // purchaseable: false,
    }

    // updatePurchaseable = ingredients => {
    //     const sum = ingredients.reduce((sum, element) => {
    //         return sum + element.amount;
    //     }, 0);
    //     this.setState({ purchaseable: sum > 0 ? true : false });
    // }
    addIngredientHandle = type => {
        this.props.addIngredient(type);
        // this.updatePurchaseable(ingredients);
        this.props.updatePurchaseable();
    }
    removeIngredientHandle = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchaseable();
    }
    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }
    handleCheckout = () => {
        this.props.history.push("/checkout");
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        IngredientAdded={this.addIngredientHandle}
                        IngredientRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchaseable={this.props.purchaseable} />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: "#D70F64" }} onClick={this.handleCheckout}>Continue to Checkout</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);


// addIngredientHandle = type => {
//     const ingredients = [...this.state.ingredients]
//     const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
//     for (let item of ingredients) {
//         if (item.type === type) item.amount++;
//     }
//     this.setState({ ingredients: ingredients, totalPrice: newPrice });
//     this.updatePurchaseable(ingredients);
// }
// removeIngredientHandle = type => {
//     const ingredients = [...this.state.ingredients];
//     const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
//     for (let item of ingredients) {
//         if (item.type === type) {
//             if (item.amount <= 0) return;
//             item.amount--;
//         }
//     }
//     this.setState({ ingredients: ingredients, totalPrice: newPrice });
//     this.updatePurchaseable(ingredients);
// }