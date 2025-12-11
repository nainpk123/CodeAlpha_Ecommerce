import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  
  // Get quantity from URL (e.g., ?qty=3)
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>Product ID: {id}</p>
      <p>Quantity: {qty}</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default CartScreen;