import React, { useEffect } from "react";
import { db } from "./firebase";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import Product from "./components/products/Product";
import Products from "./components/products/Products";
import CreateProduct from "./components/products/CreateProduct";
import UpdateProduct from "./components/products/UpdateProduct";
import AuthRoute from "./components/AuthRoute";
import AdminRoute from "./components/AdminRoute";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import UpdateProfile from "./components/UpdateProfile";
import AuthContextProvider from "./contexts/AuthContext";
import { useCreate } from "./contexts/CreateContext";
import "./assets/scss/app.scss";

const App = () => {
  const { productCategories, setGlobalCategories } = useCreate();

  useEffect(() => {
    db.collection("cloth-categories")
      .get()
      .then(function (querySnapshot) {
        let snapshotCategories = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          snapshotCategories.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setGlobalCategories(snapshotCategories);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <Router>
      <AuthContextProvider>
        <SimpleReactLightbox>
          <Navigation />

          <Container id="container" className="py-3">
            <Routes>
              <AuthRoute path="/">
                <Home />
              </AuthRoute>
              <AdminRoute path="/create">
                <CreateProduct />
              </AdminRoute>
              <AdminRoute path="/update">
                <UpdateProduct />
              </AdminRoute>
              <Route path="/products">
                {productCategories &&
                  productCategories.map((category) => (
                    <Route path={`/${category.name}`}>
                      <Products type={`${category.name}`} />
                      <Route path="/:productId">
                        <Product />
                      </Route>
                    </Route>
                  ))}
              </Route>

              <Route path="/forgot-password">
                <ForgotPassword />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/logout">
                <Logout />
              </Route>

              <Route path="/signup">
                <Signup />
              </Route>

              <AuthRoute path="/update-profile">
                <UpdateProfile />
              </AuthRoute>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </SimpleReactLightbox>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
