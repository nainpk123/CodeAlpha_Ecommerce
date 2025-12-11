import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const CartScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // 1. Get existing cart from Local Storage
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (id) {
      // 2. If we have an ID in the URL, fetch that product
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`/api/products/${id}`);
          
          const newItem = {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
          };

          // 3. Check if item already exists
          const existItem = storedCart.find((x) => x.product === newItem.product);

          let updatedCart;
          if (existItem) {
            // If exists, update it
            updatedCart = storedCart.map((x) =>
              x.product === existItem.product ? newItem : x
            );
          } else {
            // If not, add it
            updatedCart = [...storedCart, newItem];
          }

          // 4. Save to State and Local Storage
          setCartItems(updatedCart);
          localStorage.setItem('cartItems', JSON.stringify(updatedCart));
          
          // 5. Clear URL (remove the ID) so we don't re-add it on refresh
          navigate('/cart'); 

        } catch (error) {
            console.error(error);
        }
      };
      fetchProduct();
    } else {
        // If no ID (just viewing cart), load stored items
        setCartItems(storedCart);
    }
  }, [id, qty, navigate]);

  // Remove Item Handler
  const removeFromCartHandler = (id) => {
      const updatedCart = cartItems.filter((x) => x.product !== id);
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Update Quantity Handler
  const updateQtyHandler = (id, newQty) => {
      const updatedCart = cartItems.map(item => 
        item.product === id ? { ...item, qty: Number(newQty) } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  }

  const checkoutHandler = () => {
      navigate('/login?redirect=/shipping');
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="alert alert-info">
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => updateQtyHandler(item.product, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      🗑️
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;