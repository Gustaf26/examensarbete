import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { useAuth } from "../../contexts/AuthContext";
import useAlbums from "../../hooks/useAlbums";
import ProductsGrid from "./ProductsGrid";

const Products = ({ type }) => {
  const { currentUser } = useAuth();
  const { products, loading } = useAlbums(type);

  return (
    <>
      <p className="mb-3">
        All Clothes - {!loading && products && <span>{type}</span>}
      </p>

      {loading ? (
        <BounceLoader color={"#888"} size={20} />
      ) : (
        <ProductsGrid type={type} products={products} />
      )}

      {currentUser && (
        <div className="mt-3">
          <Link to="/products/create" className="btn btn-primary">
            Create a new product
          </Link>
        </div>
      )}
    </>
  );
};

export default Products;
