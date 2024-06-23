import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './css/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
