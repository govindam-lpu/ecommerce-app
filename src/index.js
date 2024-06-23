import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CartProvider from './components/CartContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <CartProvider>
        <App />
    </CartProvider>
);
