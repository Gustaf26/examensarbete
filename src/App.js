import React, { useEffect } from "react";
import { db } from "./firebase";
import { collection, query, getDocs } from "firebase/firestore";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import SimpleReactLightbox from "simple-react-lightbox";
// import { initLightboxJS } from 'lightbox.js-react'
// import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import Product from "./components/products/Product";
import Products from "./components/products/Products";
import CreateProduct from "./components/products/CreateProduct";
import UpdateProduct from "./components/products/UpdateProduct";
// import AuthRoute from "./components/AuthRoute";
// import AdminRoute from "./components/AdminRoute";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navigation from "./components/Navigation";
import SearchResults from "./components/products/SearchResults";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import UpdateProfile from "./components/UpdateProfile";
// import AuthContextProvider from "./contexts/AuthContext";
import { useCreate } from "./contexts/CreateContext";
import { useAuth } from './contexts/AuthContext'
import "./assets/scss/app.scss";

const App = () => {
  const { productCategories, setGlobalCategories } = useCreate();
  const { admin, currentUser } = useAuth();

  useEffect(() => {
    // initLightboxJS("Insert your License Key here", "Insert plan type here");
    let snapshotCategories = []
    const getProds = async () => {


      await fetch('http://127.0.0.1:8000/products/view_cats')
        .then(res => res.json())
        .then(res => {
          let querySnap = res.categories

          querySnap.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            snapshotCategories.push(
              doc.data);
            console.log(doc)
          });
          setGlobalCategories(snapshotCategories);
        })
        .catch(err => console.log(err))
    }

    getProds()

  }, []);

  const showFooter = (e) => {
    if (document.documentElement && document.documentElement.scrollTop > 100) {
      document.getElementById("footer").className = "show";
    } else {
      document.getElementById("footer").className = "";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      showFooter(e);
    });
  });

  return (
    <Router>
      <Navigation />
      <div id="main-div">
        <Container id="container" className="py-3">
          <Routes>
            <Route index to="/*" element={<Home />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path="update" element={<UpdateProduct />} />
            <Route path="search-results" element={<SearchResults />} />
            <Route path="products/*">
              {productCategories &&
                productCategories.map((category, i) => (
                  <>
                    <Route path={`${category.name}`} key={category.name} element={<Products type={`${category.name}`} />} />
                    <Route path={`${category.name}/:productId`} element={<Product />} />
                  </>))}
            </Route>
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="signup" element={<Signup />} />
            {(admin || currentUser) && <Route path="/update-profile" element={<UpdateProfile />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
      <footer id="footer" className="p-2">
        <div>
          This site has no commercial aims and is part of an academic
          development-project.
        </div>
        <div>
          Prices and articles are not intended to have a real correspondence
          with same articles in other "real websites"
        </div>
        <div>
          If you are interested in these articles we recommend you to visit{" "}
          <a href="https://www.siteking.co.uk">
            https://www.siteking.co.uk/
          </a>
        </div>
      </footer>
    </Router >
  );
};

export default App;
