import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './css/ProductCard.css';

// Creating the ProductCard component that will display the product details
const ProductCard = ({ product }) => {
    const { addToCart, adjustQuantity, removeFromCart, getProductQuantity } = useContext(CartContext);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(getProductQuantity(product.id));
    }, [getProductQuantity, product.id]);

    const handleAddToCart = () => {
        addToCart(product);
        setQuantity(1);
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        adjustQuantity(product.id, newQuantity);
    };

    const handleDecreaseQuantity = () => {
        const newQuantity = quantity - 1;
        if (newQuantity <= 0) {
            removeFromCart(product.id);
            setQuantity(0);
        } else {
            setQuantity(newQuantity);
            adjustQuantity(product.id, newQuantity);
        }
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
            </Link>
            {quantity === 0 ? (
                <button onClick={handleAddToCart}>Add to Cart</button>
            ) : (
                <div className="quantity-controls">
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={handleIncreaseQuantity}>+</button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
