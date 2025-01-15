import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/index'

const useProducts = (type) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let snapshotProducts = []
    const getProds = async () => {

      const querySnapshot = await getDocs(collection(db, type));

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        snapshotProducts.push(doc.data())
      })
      setProducts([...snapshotProducts]);
      setLoading(false);
    }

    getProds()


  }, [type]);

  return { products: products, loading };
};

export default useProducts;
