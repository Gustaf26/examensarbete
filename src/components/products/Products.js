import React from "react";

import { BounceLoader } from "react-spinners";

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
      {loading ? (
        <BounceLoader color={"#888"} size={20} />
      ) : (
        <ProductsGrid type={type} products={products} />
      )}
    </>
  );
};

export default Products;
