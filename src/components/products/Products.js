import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { useAuth } from "../../contexts/AuthContext";
import useAlbums from "../../hooks/useAlbums";
import ProductsGrid from "./ProductsGrid";

const Products = () => {
  const { currentUser } = useAuth();
  const { albums, loading } = useAlbums();

  return (
    <>
      <h2 className="mb-3">All Clothes</h2>

      {loading ? (
        <BounceLoader color={"#888"} size={20} />
      ) : (
        <ProductsGrid images={albums[0].images} />
      )}

      {currentUser && (
        <div className="mt-3">
          <Link to="/albums/create" className="btn btn-primary">
            Create a new product
          </Link>
        </div>
      )}
    </>
  );
};

export default Products;
