import React from "react";
import { useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import ProductsGrid from "./ProductsGrid";
import useAlbum from "../../hooks/useAlbum";
import UploadProductImage from "./UploadProductImage";

const Product = () => {
  const { albumId } = useParams();
  const { album, images, loading } = useAlbum(albumId);

  return (
    <>
      <h2 className="mb-3">Album {album && album.title}</h2>

      <UploadProductImage albumId={albumId} />

      <hr />

      {loading ? (
        <BounceLoader color={"#888"} size={20} />
      ) : (
        <ProductsGrid images={images} />
      )}
    </>
  );
};

export default Product;
