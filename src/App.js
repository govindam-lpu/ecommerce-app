import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import CartSidebar from './components/CartSidebar';
import './App.css';

const App = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <Router>
            <nav>
                <Link to="/" className="nav-link">H O M E</Link>
                <button className="cart-icon" onClick={toggleCart}>🛒</button>
            </nav>
            {isCartOpen && <CartSidebar toggleCart={toggleCart} />}
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
};

export default App;
