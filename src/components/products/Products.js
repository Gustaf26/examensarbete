import React from "react";

import ProductsGrid from "./ProductsGrid";

import { useCreate } from "../../contexts/CreateContext";


const Products = ({ type }) => {

  const [loading, setLoading] = React.useState(0);
  const { allProducts } = useCreate()

  const products = allProducts.filter(prod => prod.category === type)

  return (
    <>
      <ProductsGrid loading={loading} setLoading={setLoading} type={type} products={products} />
    </>
  );
};

export default Products;
