import React from 'react';
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
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/products/:category_name">
          <div style={{ background: 'inherit', height: '100px' }}>
            <NavbarMain />
          </div>
          <Products />
        </Route>
        <Route exact path="/product/:product_name">
          <div style={{ background: 'inherit', height: '100px' }}>
            <NavbarMain />
          </div>
          <ProductItem />
        </Route>
        <Route exact path="/account">
          <div style={{ background: 'inherit', height: '75px' }}>
            <NavbarMain />
          </div>
          <MyAccountsPage />
        </Route>
        <Route exact path="/account/addresses">
          <div style={{ background: 'inherit', height: '75px' }}>
            <NavbarMain />
          </div>
          <MyAccountsPage />
        </Route>
        <Route exact path="/cart">
          <div style={{ background: 'inherit', height: '75px' }}>
            <NavbarMain />
          </div>
          <CartPage />
        </Route>
        <Route exact path="/checkout">
          <div style={{ background: 'inherit', height: '75px' }}>
            <NavbarMain />
          </div>
          <CheckoutPage />
        </Route>
        <Route exact path="/orders">
          <div style={{ background: 'inherit', height: '75px' }}>
            <NavbarMain />
          </div>
          <OrdersPage />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/order-failed">
          <div style={{ background: 'inherit', height: '75px' }}>
            <NavbarMain />
          </div>
          <OrderFailedPage />
        </Route>
        <Route exact path="/order-success">
          <div style={{ background: 'inherit', height: '75px' }}>
            <NavbarMain />
          </div>
          <OrderSuccessPage />
        </Route>
        <Route component={ErrorPage} />
      </Switch>
      <ToastMessageContainer />
    </Router>
  );
}

export default App;