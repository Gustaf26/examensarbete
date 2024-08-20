import { useEffect, useState, useRef } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";

import { db } from "../firebase";


const useProducts = (type) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    products.current = [];
    // register a snapshot-listener on firestore for all available albums

    let unsubscribe;

    const q = query(collection(db, `${type}`));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLoading(true);
      let snapshotProducts = [];
      querySnapshot.forEach((doc) => {
        snapshotProducts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setProducts([...snapshotProducts]);
      setLoading(false);
    });


    return unsubscribe;
  }, [type]);

  return { products: products, loading };
};

export default useProducts;
