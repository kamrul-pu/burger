import React from "react";
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { resetIngredients } from '../../../Redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

const stl = {
    border: "1px solid grey",
    boxShadow: "1px 1px #888888",
    borderRadius: "5px",
    padding: "20px"
}

class Checkout extends React.Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }
    goBack = () => {
        this.props.history.push("/");
    }
    inputChangeHandler = (event) => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value,
            }
        })
        event.preventDefault();
    }
    submitHandler = () => {
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        axios.post('https://burger-builder-e92ae-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', order)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true, modalMsg: "Order Placed Successfully"
                    });
                    this.props.resetIngredients();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something is wrong!!! Order Again"
                    });
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something is wrong! Order Again"
                });
            });
        console.log(order);
    }

    render() {
        let form = (
            <div>
                <h4 style={stl}>Payment: {this.props.totalPrice} BDT</h4>
                <form style={stl}>
                    <textarea onChange={this.inputChangeHandler} name="deliveryAddress" placeholder="Your Address"
                        value={this.state.values.deliveryAddress} className="form-control"></textarea><br />
                    <input onChange={this.inputChangeHandler} name="phone" className="form-control" placeholder="Your Phone Number"
                        value={this.state.values.phone} /> <br />
                    <select onChange={this.inputChangeHandler} name="paymentType" value={this.state.values.paymentType}>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="nogod">Nogod</option>
                    </select><br />
                    <Button disabled={!this.props.purchaseable} onClick={this.submitHandler} className="mr-auto" style={{ backgroundColor: "#D70F64" }}>Place Order</Button>
                    <Button onClick={this.goBack} className="ml-1 m-2" color="secondary">Cancel</Button>

                </form>
            </div>
        )

        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);