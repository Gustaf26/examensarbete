import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import useProducts from "../../hooks/useProducts";
import ProductsGrid from "./ProductsGrid";
import { Breadcrumb } from "react-bootstrap";
import { useAuth } from '../../contexts/AuthContext'
import { useCreate } from '../../contexts/CreateContext'


const Products = ({ type }) => {
  const { products, loading } = useProducts(type);
  const { admin } = useAuth();
  const { mobile } = useCreate()

  return (
    <>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link to={admin ? "/cms/index" : "/"}>Home</Link>
        </Breadcrumb.Item>
        <span>{type}</span>
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
