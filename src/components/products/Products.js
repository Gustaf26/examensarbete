import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { useAuth } from "../../contexts/AuthContext";
import useAlbums from "../../hooks/useAlbums";
import ProductsGrid from "./ProductsGrid";
import { Breadcrumb } from "react-bootstrap";

const Products = ({ type }) => {
  const { currentUser } = useAuth();
  const { products, loading } = useAlbums(type);

  return (
    <>
      {/* <p className="mb-3">
        All Clothes - {!loading && products && <span>{type}</span>}
      </p> */}
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item active>All Clothes</Breadcrumb.Item>
        <Breadcrumb.Item active>{type}</Breadcrumb.Item>
      </Breadcrumb>

      {loading ? (
        <BounceLoader color={"#888"} size={20} />
      ) : (
        <ProductsGrid type={type} products={products} />
      )}
    </>
  );
};

export default Products;
