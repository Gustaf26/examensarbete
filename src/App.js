import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Product from "./components/products/Product";
import Products from "./components/products/Products";
import ProdList from './cms_components/ProdList'
import UpdateProduct from "./components/products/UpdateProduct";
import CMSNav from './cms_components/CMSNav'
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navigation from "./components/Navigation";
import SearchResults from "./components/products/SearchResults";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import UpdateProfile from "./components/UpdateProfile";
import Footer from './components/Footer'

import { useCreate } from "./contexts/CreateContext";
import { useAuth } from './contexts/AuthContext'
import { MobileContextProvider } from './contexts/MobileContext'

import "./assets/scss/app.scss";

const App = () => {
  const { productCategories, setGlobalCategories } = useCreate();
  const { admin } = useAuth();

  useEffect(() => {

    const getProds = async () => {

      setGlobalCategories([{ name: 't-shirts' }, { name: 'troussers' }, { name: 'jackets' }]);
    }

    getProds()

  }, []);



  return (
    <Router>
      <div id="main-div" style={{ width: '100vw', position: 'relative' }}>
        <MobileContextProvider>
          {admin && < CMSNav />}
          {!admin && <Navigation />}
          <Container id="container" style={admin ? { marginLeft: '240px', maxWidth: 'calc(100vw - 240px)', flexWrap: 'wrap' } : { width: '100%' }}
            className="p-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={admin ? 'cms/*' : "/*"}>
                <Route path='index' element={<Home />} />
                <Route path="search-results" element={<SearchResults />} />
                <Route path={'products/*'}>
                  {admin && <Route path={'prod-list'} element={<ProdList />} />}
                  {productCategories &&
                    productCategories.map((category, i) => (
                      <>
                        <Route path={`${category.name}`} key={category.name} element={<Products key='products' type={`${category.name}`} />} />
                        <Route path={`${category.name}/:productId`} key={`${category.name}/:productId`} element={<Product key="single-prod" />} />
                        {admin && <Route key={category.name + '-update'} path={`update`} element={<UpdateProduct key="updateProd" />} />}
                      </>))}
                </Route>
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
                <Route path="signup" element={<Signup />} />
                <Route path="update-profile" element={<UpdateProfile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Container>
          <Footer />
        </MobileContextProvider>
      </div>
    </Router >
  );
};

export default App;
