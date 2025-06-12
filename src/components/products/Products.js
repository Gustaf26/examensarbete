import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProductsGrid from "./ProductsGrid";

import { useCreate } from "../../contexts/CreateContext";

const Products = ({ type }) => {

  const [loading, setLoading] = useState(0);
  const { allProducts, setLocation } = useCreate()
  const location = useLocation()

  const products = allProducts.filter(prod => prod.category === type)

  useEffect(() => {
    setLocation(location.pathname)
  }, [location])

  return (
    <>
      <ProductsGrid loading={loading} setLoading={setLoading} type={type} products={products} />
    </>
  );
};

export default Products;
