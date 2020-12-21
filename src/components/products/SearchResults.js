import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { useCreate } from "../../contexts/CreateContext";

const ProductsGrid = ({ products, type }) => {
  const navigate = useNavigate();
  const { setSingleProduct, setProductOption, searchResults } = useCreate();

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
                {/* <Link to={`/products/${type}/${item.id}`}> */}
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
                {/* </Link> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default ProductsGrid;
