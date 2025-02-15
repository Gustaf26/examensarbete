import React from "react";

import { BounceLoader } from "react-spinners";

import useProducts from "../../hooks/useProducts";
import ProductsGrid from "./ProductsGrid";
import Navigation from '../Navigation'

import { useAuth } from '../../contexts/AuthContext'
import { useMobile } from '../../contexts/MobileContext'
import { useCreate } from "../../contexts/CreateContext";


const Products = ({ type }) => {
  // const { products, loading } = useProducts(type);
  const { allProducts } = useCreate()
  const { admin } = useAuth();
  const { mobile } = useMobile()

  const products = allProducts.filter(prod => prod.category === type)

  return (
    <>
      {!mobile && admin && <Navigation />}
      {allProducts.length === 0 ? (
        <BounceLoader color={"#888"} size={20} />
      ) : (
        <ProductsGrid type={type} products={products} />
      )}
    </>
  );
};

export default Products;
