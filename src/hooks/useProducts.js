import { useEffect, useState } from "react";


const useProducts = (type) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let snapshotProducts = []
    const getProds = async () => {


      await fetch(`http://127.0.0.1:8000/products/category/${type}`)
        .then(res => res.json())
        .then(res => {
          let querySnap = res.products

          querySnap.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            snapshotProducts.push(
              doc.data);
            setProducts([...snapshotProducts]);
            setLoading(false);
          });

        })
        .catch(err => console.log(err))
    }

    getProds()


  }, [type]);

  return { products: products, loading };
};

export default useProducts;
