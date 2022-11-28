import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";

const Main = (props) => {
    return (
        <div>
            <Header />
            <h1>Main Component</h1>
            <BurgerBuilder />
        </div>
    );
}

export default Main;