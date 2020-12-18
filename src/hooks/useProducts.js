import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";

const useProducts = (type) => {
  const products = useRef([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    products.current = [];
    // register a snapshot-listener on firestore for all available albums
    console.log(type);
    const unsubscribe = db.collection(`${type}`).onSnapshot((res) => {
      setLoading(true);
      let snapshotProducts = [];
      res.docs.forEach((doc) => {
        snapshotProducts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      products.current = snapshotProducts;
      setLoading(false);
    });
    return unsubscribe;
  }, [type]);

  return { products: products.current, loading };
};

export default useProducts;
