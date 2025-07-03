// import { useEffect, useState } from "react";
// import { db } from "../firebase";

// const useDeleteProduct = (product) => {
//   const [productForDeletion, setProduct] = useState({});

//   useEffect(() => {
//     setProduct(product);
//   }, []);

//   useEffect(() => {
//     if (!product) {
//       return;
//     }

//     if (productForDeletion) {
//       (async () => {
//         // delete document in firestore for this image
//         await db
//           .collection(`${productForDeletion.type}`)
//           .doc(productForDeletion.id)
//           .delete();

//         // delete image from storage
//         //await storage.ref(product.path).delete();

//         // profit! 💰
//       })();
//     }
//   }, [product]);
//   return;
// };

// export default useDeleteProduct;
