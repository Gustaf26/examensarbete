import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { SRLWrapper } from "simple-react-lightbox";
import { useAuth } from "../../contexts/AuthContext";
import useDeleteImage from "../../hooks/useDeleteImage";

const ProductsGrid = ({ products, title }) => {
  const [deleteImage, setDeleteImage] = useState(null);
  const { currentUser } = useAuth();
  useDeleteImage(deleteImage);

  console.log(products);

  const handleDeleteImage = (image) => {
    // eslint-disable-next-line no-restricted-globals
    if (
      alert(
        `Are you really sure you want to delete the image\n"${image.name}"?`
      )
    ) {
      setDeleteImage(image);
    }
  };

  return (
    <SRLWrapper>
      <h2>{title && title}</h2>
      <Row className="my-3">
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
                    title={item.ProductName}
                  />
                </a>
                <Card.Body>
                  <Card.Text className="text-muted small">
                    <b>Price: </b> {item.price} €
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    <b>Description: </b> {item.description}
                  </Card.Text>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleDeleteImage(item);
                    }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </SRLWrapper>
  );
};

export default ProductsGrid;
