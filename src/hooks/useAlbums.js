import { useEffect, useState } from "react";
import { db } from "../firebase";

const useAlbums = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // register a snapshot-listener on firestore for all available albums
    const unsubscribe = db.collection("products").onSnapshot((res) => {
      setLoading(true);
      let snapshotProducts = [];
      console.log(res);
      res.forEach((doc) => {
        snapshotProducts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setProducts(snapshotProducts);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { products, loading };
};

export default useAlbums;
