import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { Card, Button, Breadcrumb } from "react-bootstrap";
import { useCreate } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
//import UploadProductImage from "./UploadProductImage";

const Product = () => {
  const { singleProduct, productOption, setSingleProduct } = useCreate();
  const { admin } = useAuth();
  const navigate = useNavigate();

  const handleUpdateProduct = (product) => {
    setSingleProduct(product);
    navigate(`/update`);
  };

  const handleDeleteProduct = (product) => {
    try {
      const deletion = async () => {
        console.log("ddeleteing " + product.name + "of" + productOption);

        db.collection(`${productOption}`).doc(`${product.id}`).delete();

        setTimeout(() => {
          navigate(`/products/${productOption}`);
        }, 1000);
      };

      deletion();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {productOption && (
            <Link to={`/products/${productOption}`}>{productOption}</Link>
          )}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {singleProduct ? singleProduct.name : null}
        </Breadcrumb.Item>
      </Breadcrumb>
      {!singleProduct && <BounceLoader color={"#888"} size={20} />}
      {singleProduct && (
        <Card className="mb-3 col-6 mx-auto">
          <h2 className="mb-3 mt-3 col-12 d-flex justify-content-center">
            {" "}
            {singleProduct && singleProduct.name}
          </h2>
          <p
            href={singleProduct.thumbnail}
            title="View image in lightbox"
            data-attribute="SRL"
          >
            <Card.Img
              variant="top"
              src={singleProduct.thumbnail}
              title={singleProduct.name}
            />
          </p>
          <Card.Body>
            <Card.Text className="text-muted small">
              <b>{singleProduct.name}</b>
            </Card.Text>
            <Card.Text className="text-muted small">
              <b>Price: </b> {singleProduct.price} €
            </Card.Text>
            <Card.Text className="text-muted small">
              <b>Description: </b>{" "}
              <span>
                {singleProduct.description.slice(0, 100)}... <b>(Read more)</b>
              </span>
            </Card.Text>
            {admin && (
              <div>
                <Button
                  variant="danger"
                  size="sm"
                  className="col-12 mt-3 p-2"
                  onClick={() => {
                    handleDeleteProduct(singleProduct);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="col-12 mt-3 p-2"
                  onClick={() => {
                    handleUpdateProduct(singleProduct);
                  }}
                >
                  Update
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Product;
