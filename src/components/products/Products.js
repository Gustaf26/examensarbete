import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProductsGrid from "./ProductsGrid";

import { useCreate } from "../../contexts/CreateContext";

const Products = ({ type }) => {

  const { allProducts, setLocation } = useCreate()
  const location = useLocation()

  const products = allProducts.filter(prod => prod.category === type)

  useEffect(() => {
    setLocation(location.pathname)
  }, [location])

  return (
    <>
      <ProductsGrid type={type} products={products} />
    </>
  );
};

export default Products;
