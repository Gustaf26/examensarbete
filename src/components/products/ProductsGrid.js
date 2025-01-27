//import firebase from "firebase/app";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";

import Icon from '@mui/material/Icon';


import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { db } from "../../firebase";

const ProductsGrid = ({ products, type }) => {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const { setSingleProduct, setProductOption, mobile } = useCreate();

  const containerStyles = {
    border: mobile ? '2px solid lightgrey' : 'none',
    width: mobile ? '400px' : '1000px',
    margin: mobile ? '0 auto' : '10px',
    padding: '0 10px 10px 10px',
    overflowY: mobile ? 'scroll' : 'none',
    maxHeight: mobile ? '750px' : 'none',
    borderRadius: '3px',
    position: 'relative',
    backgroundColor: mobile ? 'rgb(239, 238, 238)' : ''
  }

  const handleUpdateProduct = (product) => {
    setSingleProduct(product);
    navigate(`/cms/products/update`, { replace: true });
  };

  const handleDeleteProduct = (product) => {
    try {
      const deletion = async () => {
        console.log("ddeleteing " + product.name);

        await db.collection(`${type}`).doc(`${product.id}`).delete();
      };

      deletion();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <SRLWrapper>
    <Row style={containerStyles} className="mt-5 mb-5" onLoad={() => setProductOption(type)}>

      <Icon style={{ width: '20px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '0', position: 'sticky', top: `0`, left: '-10px', backgroundColor: 'lightgrey' }} color='info'>device_unknown</Icon>

      {products &&
        products.map((item) => (
          <Col className="p-0" sm={6} md={4} lg={mobile ? 12 : 3} key={item.id}>
            <Card className="mb-5">
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
              <Card.Body
                className="d-block"
                onClick={() => setSingleProduct(item)}
              >
                {" "}
                <Link to={admin ? `/cms/products/${type}/${item.id}` : `products/${type}/${item.id}`} >
                  <Card.Text className="text-muted small">
                    <b>{item.name}</b>
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    <b>Price: </b> {item.price} €
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    <b>Description: </b>{" "}
                    <span>
                      {item.description.slice(0, 100)}... <b>(Read more)</b>
                    </span>
                  </Card.Text>
                </Link>
                {admin && (
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                    <Button
                      variant="danger"
                      size="sm"
                      className="col-5 mt-3 mr-1 p-2"
                      onClick={() => {
                        handleDeleteProduct(item);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="col-5 mt-3 ml-3 p-2"
                      onClick={() => {
                        handleUpdateProduct(item);
                      }}
                    >
                      Update
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
    // </SRLWrapper>
  );
};

export default ProductsGrid;
