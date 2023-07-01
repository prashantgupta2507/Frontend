import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainPage from './Components/MainPage';
import ToastMessageContainer from './Components/ToastMessageContainer';
import Products from './Pages/Products';
import NavbarMain from './Components/header/NavbarMain';
import MyAccountsPage from './Pages/MyAccountsPage'
import Admin from './Components/admin/Admin';
import ProductItem from './Pages/ProductItem';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import OrdersPage from './Pages/OrdersPage';
import OrderSuccessPage from './Pages/OrderSuccessPage'
import OrderFailedPage from './Pages/OrderFailedPage'
import ErrorPage from './Pages/ErrorPage'

function App() {

  const [path, setPath] = useState("/")

  return (
    <>
      <Router>
        {path === "/" ?
          <div className="App" style={{ height: '90vh' }}>
            <NavbarMain />
          </div> :
          (path === "/admin" ? null :
            <div style={{ background: 'inherit', height: '100px' }}>
              <NavbarMain />
            </div>
          )}
        <Switch>
          <Route exact path="/">
            <MainPage setPath={setPath} />
          </Route>
          <Route exact path="/products/:category_name">
            <Products setPath={setPath} />
          </Route>
          <Route exact path="/product/:product_name">
            <ProductItem setPath={setPath} />
          </Route>
          <Route exact path="/account">
            <MyAccountsPage setPath={setPath} />
          </Route>
          <Route exact path="/account/addresses">
            <MyAccountsPage setPath={setPath} />
          </Route>
          <Route exact path="/cart">
            <CartPage setPath={setPath} />
          </Route>
          <Route exact path="/checkout">
            <CheckoutPage setPath={setPath} />
          </Route>
          <Route exact path="/orders">
            <OrdersPage setPath={setPath} />
          </Route>
          <Route exact path="/admin">
            <Admin setPath={setPath} />
          </Route>
          <Route exact path="/order-failed">
            <OrderFailedPage setPath={setPath} />
          </Route>
          <Route exact path="/order-success">
            <OrderSuccessPage />
          </Route>
          <Route component={ErrorPage} setPath={setPath} />
        </Switch>
        <ToastMessageContainer />
      </Router>
    </>
  );
}

export default App;