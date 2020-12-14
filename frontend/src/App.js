import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import StockManage from './pages/StockManage';

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu =() =>{
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu =() =>{
    document.querySelector(".sidebar").classList.remove("open")
  }


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Soap Site</Link>
            </div>
            <div className="header-links">
                <a href="cart.html">Cart</a>
                {
                  userInfo ? <Link to="/profile"> Welcome back {userInfo.name}</Link>:
                  <Link to="/signin">Sign in</Link>
                }
            </div>
        </header>
        <aside className="sidebar">
            <button className="sidebar-close-button" onClick={closeMenu}>X</button>
            <div className="catagorySide">
            <h3 className="titleSide">Shop by catagory</h3>
            <ul className="listSide">
                <li>
                    <a href="index.html">Bars</a>
                </li>
                <li>
                    <a href="gel.html">Gels</a>
                </li>
            </ul>
            </div>
            <div className="navSide">
            <h3 className="titleSide">About us.</h3>
            <ul className="listSide">
                <li>
                    <a href="index.html">About</a>
                </li>
                <li>
                    <a href="gel.html">Contact</a>
                </li>
            </ul>
            </div>
            <div className="profileSide">
            <h3 className="titleSide">About You.</h3>
            <ul className="listSide">
                <li>
                    <a href="index.html">Edit Profile</a>
                </li>
            </ul>
            </div>
        </aside>
        <main className="main">
            <div className="content">
              <Route path="/stockmanage" component={StockManage} />
              <Route path="/signin" component={SignIn} />
              <Route path="/register" component={Register} />
              <Route path="/product/:id" component={Product} />
              <Route path="/cart/:id?" component={Cart} />
              <Route path="/" exact={true} component={Home} />
            </div>
        </main>
        <footer className="footer">
            All rights reserved.
        </footer>
     </div>
  </BrowserRouter>
  );
}

export default App;