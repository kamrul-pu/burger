import React from "react";
import { connect } from 'react-redux';
import { fetchOrders } from '../../Redux/actionCreators';
import Order from "./Order";
import Spinner from "../Spinner/Spinner";

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderError: state.orderError,
        token: state.token,
        userId: state.userId,
    }
}

class Orders extends React.Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    componentDidUpdate() {
        console.log(this.props);
    }
    render() {
        let orders = null;
        if (this.props.orderError) {
            orders = <p style={{ border: "1px solid grey", boxShadow: "1px 1px #88888", borderRadius: "5px", padding: "20px", marginBottom: "10px" }}>Sorry Failed to Load Orders</p>
        } else {
            if (this.props.orders.length === 0) {
                orders = <p style={{ border: "1px solid grey", boxShadow: "1px 1px #88888", borderRadius: "5px", padding: "20px", marginBottom: "10px" }}>You have no orders</p>
            } else {
                orders = this.props.orders.map(order => {
                    return <Order order={order} key={order.id} />
                });
            }
        }

        return (
            <div>
                {this.props.orderLoading ? <Spinner /> : orders}
            </div >
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);