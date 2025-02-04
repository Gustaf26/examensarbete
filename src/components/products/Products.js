import React from "react";
import { Link } from "react-router-dom";

import { BounceLoader } from "react-spinners";
import { Breadcrumb } from "react-bootstrap";

import useProducts from "../../hooks/useProducts";
import ProductsGrid from "./ProductsGrid";
import Navigation from '../Navigation'

import { useAuth } from '../../contexts/AuthContext'
import { useMobile } from '../../contexts/MobileContext'


const Products = ({ type }) => {
  const { products, loading } = useProducts(type);
  const { admin } = useAuth();
  const { mobile } = useMobile()

  return (
    <>
      {!mobile && admin && <Navigation />}
      <Breadcrumb className="m-3">
        <Breadcrumb.Item>
          <Link to={admin ? "/cms/index" : "/"}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {type && (
            <Link to={admin ? `/cms/products/${type}` : `/products/${type}`}>{type}</Link>
          )}
        </Breadcrumb.Item>
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
