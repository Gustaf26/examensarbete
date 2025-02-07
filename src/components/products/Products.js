import React from "react";
import { Link } from "react-router-dom";

import { BounceLoader } from "react-spinners";
import { Breadcrumb } from "react-bootstrap";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
      {/* {!mobile && <Breadcrumb className="m-5">
        <Breadcrumb.Item>
          <Link to={admin ? "/cms/index" : "/"}> <HomeIcon sx={{ mr: 1, mb: 0.3 }} fontSize="medium" />Home</Link>
        </Breadcrumb.Item>
        <NavigateNextIcon style={{ color: '#0d6efd' }} sx={{ mr: 1, ml: 1, mt: 0.4 }} fontSize="medium" />
        <Breadcrumb.Item>
          {type && (
            <Link to={admin ? `/cms/products/${type}` : `/products/${type}`}>{type}</Link>
          )}
        </Breadcrumb.Item>
      </Breadcrumb>} */}

      {loading ? (
        <BounceLoader color={"#888"} size={20} />
      ) : (
        <ProductsGrid type={type} products={products} />
      )}
    </>
  );
};

export default Products;
