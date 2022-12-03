import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = igType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igType
    }
}

export const removeIngredient = igType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igType
    }
}

export const updatePurchaseable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASEABLE
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENT
    }
}

export const loadOrders = (orders) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED,
    }
}

export const fetchOrders = () => dispatch => {
    axios.get("https://burger-builder-e92ae-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json")
        .then(response => {
            dispatch(loadOrders(response.data));
        })
        .catch(err => console.log(err));
}