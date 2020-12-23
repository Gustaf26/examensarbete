import { useRef } from "react";
import { db } from "../firebase";
import { createContext, useContext, useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

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
  const allProducts = useRef([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    allProducts.current = [];
    productCategories.map((category) => {
      let snapshotProducts = [];

      const unsubscribe = db
        .collection(`${category.name}`)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            snapshotProducts.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          let emptyArr;
          emptyArr = [...snapshotProducts];
          console.log(emptyArr);

          emptyArr.map((product) => {
            allProducts.current.map((prod, index) => {
              if (
                prod.id === product.id &&
                prod.category.toLowerCase() === product.category.toLowerCase()
              ) {
                allProducts.current.splice(index, 1);
              }

              if (prod.name === product.name) {
                allProducts.current.splice(index, 1);
              }
            });
          });

          allProducts.current.push(...snapshotProducts);
          snapshotProducts = [];
        });
    });
    return () => {
      allProducts.current = [];
    };
  }, [productCategories]);

  useEffect(() => {
    if (allProducts && searchString !== "") {
      allProducts.current.map((product) => {
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
