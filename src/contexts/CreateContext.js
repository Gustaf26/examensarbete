

import { createContext, useContext, useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { db } from '../firebase/index'
import { collection, getDocs } from "firebase/firestore";

import { useAuth } from './AuthContext'

const CreateContext = createContext();

const useCreate = () => {
  return useContext(CreateContext);
};

const CreateContextProvider = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [productOption, setProductOption] = useState(null);
  const [singleProduct, setSingleProduct] = useState("");
  const [productCategories, setGlobalCategories] = useState([]);
  const [allProducts, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [location, setLocation] = useState("");
  const [prodId, setProdId] = useState("");

  const { admin } = useAuth()

  const getSingleProduct = (products) => {

    let firstDash;
    let secondDash;
    let semiPath;
    let category;


    firstDash = location.indexOf("/");
    secondDash = location.lastIndexOf("/");
    semiPath = location.slice(firstDash, secondDash);
    category = admin ? semiPath.replace("/cms/products/", "") : semiPath.replace("/products/", "");


    let preliminaryProd = products.filter(
      (prod) => prod.id === Number(prodId) && prod.category === category
    );

    if (preliminaryProd.length) {
      setProductOption(category);
      setSingleProduct(preliminaryProd[0]);
    }
  };

  useEffect(() => {
    let snapshotProducts = [];
    productCategories.forEach(async (category) => {

      const querySnapshot = await getDocs(collection(db, category.name));

      querySnapshot.forEach((doc) => {
        snapshotProducts.push(doc.data())
      })
      let emptyArr;
      emptyArr = [...snapshotProducts];


      // Deleting duplicates from snapshots data
      snapshotProducts.forEach((prod) => {
        if (!emptyArr.includes(prod)) {
          emptyArr.push(prod)
        }
      })
      console.log(emptyArr);

      // Getting search string from local Storage on reload in search-results-route when all products available
      if (
        emptyArr.length > 10 &&
        (location === "/search-results" || location === "/cms/search-results") &&
        searchString === ""
      ) {
        setSearchString(JSON.parse(window.localStorage.getItem("search")));
      }


      setProducts([...emptyArr])

      // Function to fetch product when routing to /products/{category}/:productId
      if (prodId) {
        getSingleProduct([...emptyArr]);
      }
      setLoading(false);
    })

    return () => {
      snapshotProducts = [];
    };
  }, [productCategories, prodId]);

  useEffect(() => {

    setSearchResults([]);

    if (allProducts.length > 0 && searchString !== "") {
      let prodsDummy = []
      allProducts.forEach((product) => {
        if (
          (product.name.includes(searchString.toLowerCase())) ||
          (product.description.toLowerCase()
            .includes(searchString.toLowerCase())) ||
          (product.category.toLowerCase().includes(searchString.toLowerCase()))
        ) {
          prodsDummy.push(product)
        }
      });
      setSearchResults(prodsDummy);
    }
  }, [searchString, allProducts]);



  const contextValues = {
    setImageUrl,
    imageUrl,
    setProductOption,
    productOption,
    setSingleProduct,
    singleProduct,
    productCategories,
    setGlobalCategories,
    setSearchString,
    allProducts,
    searchResults,
    setSearchResults,
    getSingleProduct,
    setProdId,
    setLocation,
    searchString
  };

  return (
    <CreateContext.Provider value={contextValues}>
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <BounceLoader color={"#888"} size={100} />
        </div>
      )}
      {!loading && props.children}
    </CreateContext.Provider>
  );
};

export { CreateContext, useCreate, CreateContextProvider as default };
