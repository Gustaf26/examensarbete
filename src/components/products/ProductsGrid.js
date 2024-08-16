//import firebase from "firebase/app";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
// import { SRLWrapper } from "simple-react-lightbox";
import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { db } from "../../firebase";

const ProductsGrid = ({ products, type }) => {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const { setSingleProduct, setProductOption } = useCreate();

  const handleUpdateProduct = (product) => {
    setSingleProduct(product);
    navigate(`/update`);
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
    <Row className="mt-3 mb-5" onLoad={() => setProductOption(type)}>
      {products &&
        products.map((item) => (
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
              <Card.Body
                className="d-block"
                onClick={() => setSingleProduct(item)}
              >
                {" "}
                <Link to={`/products/${type}/${item.id}`}>
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
                  <div>
                    <Button
                      variant="danger"
                      size="sm"
                      className="col-5 mt-3 ml-3 p-2"
                      onClick={() => {
                        handleDeleteProduct(item);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="col-5 mt-3 ml-2 p-2"
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
