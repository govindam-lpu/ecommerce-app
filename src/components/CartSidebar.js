import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './css/CartSidebar.css';

// Creating the CartSidebar component that will display the cart items and the total price

const CartSidebar = ({ toggleCart }) => {
    const { cart, removeFromCart, adjustQuantity } = useContext(CartContext);

    // const handleQuantityChange = (productId, event) => {
    //     const newQuantity = parseInt(event.target.value, 10);
    //     adjustQuantity(productId, newQuantity);
    // };

    const handleIncreaseQuantity = (productId, currentQuantity) => {
        adjustQuantity(productId, currentQuantity + 1);
    };

    const handleDecreaseQuantity = (productId, currentQuantity) => {
        adjustQuantity(productId, currentQuantity - 1);
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-sidebar">
            <button className="close-btn" onClick={toggleCart}>✖</button>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} />
                            <div className="item-details">
                                <h3>{item.title}</h3>
                                <p>${item.price.toFixed(2)}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>-</button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        readOnly
                                    />
                                    <button onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>+</button>
                                </div>
                            </div>
                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✖</button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Subtotal: ${calculateTotalPrice()}</h3>
                    </div>
                </div>
            )}
            <button className="checkout-btn">CHECK OUT</button>
        </div>
    );
};

export default CartSidebar;
