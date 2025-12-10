import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // This asks your working backend for data
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">CodeAlpha Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link href="/login">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="py-3">
        <Container>
          <h1 className="text-center my-4">Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Card className="my-3 p-3 rounded">
                  <Card.Img src={product.image} variant="top" />
                  <Card.Body>
                    <Card.Title as="div">
                      <strong>{product.name}</strong>
                    </Card.Title>
                    <Card.Text as="h3">${product.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;