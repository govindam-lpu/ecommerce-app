import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './CartContext';
import './css/ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, getProductQuantity, adjustQuantity, removeFromCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    useEffect(() => {
        setQuantity(getProductQuantity(Number(id)));
    }, [getProductQuantity, id]);

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

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-details-container">
            <div className="product-image">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
                <h1>{product.title}</h1>
                <p className="category">Category: {product.category}</p>
                <p>{product.description}</p>
                <p className="price">${product.price}</p>
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
        </div>
    );
};

export default ProductDetails;
