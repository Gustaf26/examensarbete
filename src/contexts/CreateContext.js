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
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const getAllProducts = (categories) => {
    categories.map((category) => {
      db.collection(`${category.name}`)
        .get()
        .then((res) => {
          res.docs.forEach((doc) =>
            setAllProducts((prevProds) => [...prevProds, doc.data()])
          );
        });
    });
  };
  useEffect(() => {
    if (productCategories) {
      getAllProducts(productCategories);
    }
  }, [productCategories]);

  const contextValues = {
    setImageUrl,
    imageUrl,
    setProductOption,
    productOption,
    setSingleProduct,
    singleProduct,
    productCategories,
    setGlobalCategories,
    allProducts,
    searchResults,
    setSearchResults,
    getAllProducts,
    setAllProducts,
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
