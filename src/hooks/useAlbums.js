import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";

const useAlbums = (type) => {
  const products = useRef([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    products.current = [];
    // register a snapshot-listener on firestore for all available albums
    console.log(type);
    const unsubscribe = db.collection("products").onSnapshot((res) => {
      setLoading(true);
      let snapshotProducts = [];
      res.forEach((doc) => {
        if (doc.id === type) {
          snapshotProducts.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      });

      products.current = snapshotProducts;
      setLoading(false);
    });
    return unsubscribe;
  }, [type]);

  return { products: products.current, loading };
};

export default useAlbums;
