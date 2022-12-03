import React from "react";
import { connect } from 'react-redux';
import { fetchOrders } from '../../Redux/actionCreators';

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders()),
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderError: state.orderError,
    }
}

class Orders extends React.Component {
    componentDidMount() {
        this.props.fetchOrders();
    }
    componentDidUpdate() {
        console.log(this.props);
    }
    render() {
        return (
            <div>
                <p>Orders</p>
            </div >
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);