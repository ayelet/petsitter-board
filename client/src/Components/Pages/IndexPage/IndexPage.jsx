import React from "react";

import { Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
// import ProductsPage from "./ProductsPage";
// import CartPage from "../Cart/CartPage";
// import AboutPage from "../About/AboutPage";
// import ContactPage from "../Contact/Contact";
import HomePage from "../HomePage/HomePage";
import Login from "../LogIn/LogIn";
import useToken from "../../App/useToken";
// import ProductDetail from "../Product/ProductDetail";
// import NutritionCalculaotr from "./NutritionCalculator/NutritionCalculaotr";

export default function IndexPage() {
  const { token, setToken } = useToken();
  return (
    <div>
      <Route path="/" exact component={HomePage} />
      <Route
        path="/Login"
        exact
        render={(props) => <Login {...props} setToken={setToken} />}
      />
      <Route path="/Dashboard" exact component={Dashboard} />

      {/*   <Route path="/Contact" exact component={ContactPage} />
      <Route path="/About" exact component={AboutPage} />
      <Route path="/Products/" exact component={ProductsPage} />
      <Route path="/Products/id=:id" exact component={ProductDetail} />
      <Route path="/Cart" component={CartPage} />
      <Route path="/Calculator" component={NutritionCalculaotr} /> */}
    </div>
  );
}
