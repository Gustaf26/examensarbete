import React from "react";
import { db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useCreate } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";

const SearchResults = ({ type }) => {
  const navigate = useNavigate();
  const { setSingleProduct, setProductOption, searchResults } = useCreate();
  const { admin } = useAuth();

  const handleUpdateProduct = (product) => {
    setSingleProduct(product);
    navigate(`/update`);
  };

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
  return (
    <Row className="my-3" onLoad={() => setProductOption(type)}>
      {searchResults &&
        searchResults.map((item, index) => (
          <Col
            sm={6}
            md={6}
            lg={3}
            key={item.id + Math.floor(Math.random() * 100)}
          >
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
                <Link to={`/products/${item.category}/${item.id}`}>
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
                      {/* <b onClick={() => showDescription(item)}>(Read more)</b> */}
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
  );
};

export default SearchResults;