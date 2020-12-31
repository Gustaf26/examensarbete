import React, { useEffect } from "react";
import { db } from "../../firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Card, Button, Breadcrumb } from "react-bootstrap";
import { useCreate } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";

const SearchResults = () => {
  const navigate = useNavigate();
  const {
    setSingleProduct,
    setProductOption,
    searchResults,
    setSearchResults,
    productOption,
    setLocation,
  } = useCreate();

  const { admin } = useAuth();
  const location = useLocation();

  const handleUpdateProduct = (product) => {
    setSingleProduct(product);
    navigate(`/update`);
  };

  const handleDeleteProduct = (product) => {
    console.log(product);

    try {
      const deletion = async () => {
        console.log("ddeleteing " + productOption + product.name);

        await db
          .collection(`${productOption}`)
          .doc(`${product.id}`)
          .delete()
          .then(setSearchResults([]))
          .then(navigate(`/products/${productOption}`));
      };

      deletion();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLocation(location.pathname);
  }, []);

  return (
    <>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Search results</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="my-3">
        {searchResults &&
          searchResults.map((item, index) => (
            <Col sm={6} md={6} lg={3} key={index}>
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
                  onClick={() => {
                    setSingleProduct(item);
                    setProductOption(item.category);
                  }}
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
    </>
  );
};

export default SearchResults;
