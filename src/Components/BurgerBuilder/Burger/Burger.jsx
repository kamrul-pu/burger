import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import './Burger.css';
const Burger = props => {

    let ingredientArr = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
        .reduce((arr, element) => {
            return arr.concat(element);
        }, []);
    // let ingredientArr = props.ingredients.map(item => {

    //     for (let i = 0; i < item.amount; i++) {
    //         return <Ingredient type={item.type} key={Math.random()} />
    //     }
    // })

    // console.log(ingredientArr);
    if (ingredientArr.length === 0) {
        ingredientArr = <p>Please Add some ingredients</p>
    }
    return (
        <div className='Burger'>
            <Ingredient type="bread-top" />
            {ingredientArr}
            <Ingredient type="bread-bottom" />
        </div>
    );
}

export default Burger;