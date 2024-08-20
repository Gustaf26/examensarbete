import { useEffect, useState, useRef } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "../firebase";


const useProducts = (type) => {
  const products = useRef([]);
  const [loading, setLoading] = useState(true);

  const q = query(collection(db, "cities"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
    });
    console.log("Current cities in CA: ", cities.join(", "));
  });

  useEffect(() => {
    products.current = [];
    // register a snapshot-listener on firestore for all available albums

    let unsubscribe;

    const getProds = async () => {
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

        products.current = snapshotProducts;
        setLoading(false);
      });

    }

    getProds()

    return unsubscribe;
  }, [type]);

  return { products: products.current, loading };
};

export default useProducts;
