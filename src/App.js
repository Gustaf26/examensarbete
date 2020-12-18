import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import Product from "./components/products/Product";
import Products from "./components/products/Products";
import CreateProduct from "./components/products/CreateProduct";
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
import CreateContextProvider from "./contexts/CreateContext";
import "./assets/scss/app.scss";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <CreateContextProvider>
          <SimpleReactLightbox>
            <Navigation />

            <Container className="py-3">
              <Routes>
                <AuthRoute path="/">
                  <Home />
                </AuthRoute>
                <AdminRoute path="/create">
                  <CreateProduct />
                </AdminRoute>
                <Route path="/products">
                  <Route path="/troussers">
                    <Products type="troussers" />
                    <Route path="/:productId">
                      <Product />
                    </Route>
                  </Route>
                  <Route path="/jackets">
                    <Products type="jackets" />
                    <Route path="/:productId">
                      <Product />
                    </Route>
                  </Route>
                  <Route path="/t-shirts">
                    <Products type="t-shirts" />
                    <Route path="/:productId">
                      <Product />
                    </Route>
                  </Route>
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
        </CreateContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
