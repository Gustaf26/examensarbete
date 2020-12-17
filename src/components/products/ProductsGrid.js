//import firebase from "firebase/app";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { SRLWrapper } from "simple-react-lightbox";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

const ProductsGrid = ({ products, type }) => {
  const descriptionItems = useRef([]);
  const { currentUser, admin } = useAuth();

  const handleDeleteProduct = (product) => {
    try {
      const deletion = async () => {
        console.log("ddeleteing " + product.name);

        db.collection(`${type}`).doc(`${product.id}`).delete();
      };

      deletion();
    } catch (error) {
      console.log(error);
    }
  };

  const showDescription = (item) => {
    console.log(item);
  };

  useEffect(() => {
    console.log(products);
  }, []);

  return (
    <SRLWrapper>
      <Row className="my-3">
        {products &&
          products.map((item, index) => (
            <Col sm={6} md={4} lg={3} key={item.id}>
              <Card className="mb-3">
                <a
                  href={item.thumbnail}
                  title="View image in lightbox"
                  data-attribute="SRL"
                >
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    title={item.name}
                  />
                </a>
                <Card.Body>
                  <Link to={`/products/${type}/${item.id}`}>
                    <Card.Text className="text-muted small">
                      <b>{item.name}</b>
                    </Card.Text>
                    <Card.Text className="text-muted small">
                      <b>Price: </b> {item.price} €
                    </Card.Text>
                    <Card.Text className="text-muted small">
                      <b>Description: </b>{" "}
                      <span ref={descriptionItems[index]}>
                        {item.description.slice(0, 100)}... <b>(Read more)</b>
                        {/* <b onClick={() => showDescription(item)}>(Read more)</b> */}
                      </span>
                    </Card.Text>
                  </Link>
                  {admin && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        handleDeleteProduct(item);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </SRLWrapper>
  );
};

export default ProductsGrid;
