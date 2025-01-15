

import { createContext, useContext, useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { db } from '../firebase/index'
import { collection, getDocs } from "firebase/firestore";

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
  // const [currentPassword, setCurrentPassword] = useState("");

  const getSingleProduct = () => {
    const firstDash = location.indexOf("/");
    const secondDash = location.lastIndexOf("/");
    const semiPath = location.slice(firstDash, secondDash);
    const category = semiPath.replace("/products/", "");

    let preliminaryProd = allProducts.current.filter(
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
        location === "/search-results" &&
        searchString === ""
      ) {
        setSearchString(JSON.parse(window.localStorage.getItem("search")));
      }

      // Function to fetch product when routing to /products/{category}/:productId
      if (prodId) {
        getSingleProduct();
      }

      setProducts([...emptyArr])

      setLoading(false);
    })

    return () => {
      snapshotProducts = [];
    };
  }, [productCategories, prodId]);

  useEffect(() => {
    if (allProducts.length && searchString !== "") {
      allProducts.map((product) => {
        if (
          (product.name &&
            product.name.toLowerCase().includes(searchString.toLowerCase())) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchString.toLowerCase())) ||
          (product.category &&
            product.category.toLowerCase().includes(searchString.toLowerCase()))
        ) {
          setSearchResults((prevProds) => [...prevProds, product]);
        }
      });
    }
  }, [searchString]);

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
    searchString,
    // currentPassword,
    // setCurrentPassword,
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
