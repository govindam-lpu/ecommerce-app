import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    };

    const adjustQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart((prevCart) =>
                prevCart.map((product) =>
                    product.id === productId ? { ...product, quantity: Number(quantity) } : product
                )
            );
        }
    };

    const getProductQuantity = (productId) => {
        const product = cart.find((item) => item.id === productId);
        return product ? product.quantity : 0;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, adjustQuantity, getProductQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
