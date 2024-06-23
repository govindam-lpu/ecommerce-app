import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './css/Cart.css';

const Cart = () => {
    const { cart, removeFromCart, adjustQuantity } = useContext(CartContext);

    const handleQuantityChange = (productId, event) => {
        const newQuantity = event.target.value;
        adjustQuantity(productId, newQuantity);
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} />
                            <h3>{item.title}</h3>
                            <p>${item.price}</p>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(event) => handleQuantityChange(item.id, event)}
                            />
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: ${calculateTotalPrice()}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
