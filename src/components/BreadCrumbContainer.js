import { useState, useEffect } from "react";

import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router";

import { useCreate } from "../contexts/CreateContext";
import { useAuth } from "../contexts/AuthContext";
import { useMobile } from "../contexts/MobileContext";

import ArrowBack from "@mui/icons-material/ArrowBack";

export default function BreadCrumbContainer({ qty }) {
  const { productCategories, allProducts } = useCreate();
  const { admin } = useAuth();
  const { mobile } = useMobile();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const location = useLocation();

  const dummyProdCategories = productCategories.map((cat) => cat.name);

  useEffect(() => {
    if (location.pathname.lastIndexOf("/") === location.pathname.length - 1) {
      location.pathname = location.pathname.slice(
        0,
        location.pathname.length - 1,
      );
    }

    // Logic to set the breadcrumbs parting from the url

    let lastDash = location.pathname.lastIndexOf("/");
    let lastChar = location.pathname.length;
    let subcategory = location.pathname.slice(lastDash + 1, lastChar);

    // Search-results is a special case, not compunded with products
    let rootUrl =
      subcategory !== "search-results"
        ? location.pathname.replace(`/${subcategory}`, "")
        : location.pathname;

    let overcategory = rootUrl.slice(
      rootUrl.lastIndexOf("/") + 1,
      rootUrl.length,
    );

    // Home is the first breadcrumb
    let dummyBread = ["Home"];

    // Next breadcrumb is the product category ('jackets'...). We don´t want "products" as a breadcrumb
    if (overcategory !== "products") dummyBread.push(overcategory);

    // This is the logic to set the breadcrumb for the single product (the product with same id as the urllast part)
    // when we are at single product page
    let singleProd;

    if (subcategory && Number(subcategory)) {
      singleProd = allProducts.filter(
        (prod) => prod.id === Number(subcategory),
      );
    }

    // We´ll push to the breadcrumbs the name of the product

    if (singleProd && singleProd.length > 0) {
      subcategory = singleProd[0].name;
    }

    // ... and make a breadcrumb with it
    if (subcategory !== "search-results") {
      dummyBread.push(subcategory);
    }

    // When no product or product category or search functionality is selected
    // there are no breadcrumbs
    if (!overcategory && !subcategory) {
      dummyBread = [];
    }

    setBreadcrumbs(dummyBread);
  }, [location]);

  return (
    <Breadcrumb
      style={
        !(mobile && admin)
          ? { margin: "40px 40px 0px 0px" }
          : { margin: "40px" }
      }
    >
      <ArrowBack
        style={{ color: "#0d6efd" }}
        sx={{ mr: 1, ml: 1, mt: 0.4 }}
        fontSize='medium'
      />
      {breadcrumbs &&
        breadcrumbs.map((bread, i) => {
          return bread === "Home" ? (
            <Breadcrumb.Item>
              <Link className='link' to={admin ? "/cms/index" : "/"}>
                Home
              </Link>
            </Breadcrumb.Item>
          ) : dummyProdCategories.includes(bread.toLowerCase()) ? (
            <Breadcrumb.Item>
              <Link
                className='link'
                to={admin ? `/cms/products/${bread}` : `/products/${bread}`}
              >
                {bread}
              </Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              <span className='link'>{bread}</span>
            </Breadcrumb.Item>
          );
        })}
    </Breadcrumb>
  );
}
