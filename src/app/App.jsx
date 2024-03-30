import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

//App components
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import About from "../components/About";
import Footer from "../components/Footer";
import Wholesale from "../components/Sections/Wholesale";
import AboutUs from "../components/Sections/AboutUs";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import DevLogin from "../components/Helpers/DevLogin";
import ShoppingCart from "../components/Purchase/ShoppingCart";
import PaymentSuccess from "../components/Purchase/PaymentSuccess";
import PaymentCanceled from "../components/Purchase/PaymentCanceled";
import Product from "../components/Sections/Product";
import ProductDetail from "../components/Products/ProductDetail";
import ProductTable from "../components/Products/ProductTable";
import UserProfile from "../components/Sections/UserProfile";
import UsersTable from "../components/User/UsersTable";
import UserForm from "../components/User/UserForm";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";

class App extends Component {
  render() {
    return (
      <ShoppingCartProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/" element={<About />} />
            <Route path="/" element={<Footer />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/product/:productId" element={<ProductDetail/>} />
            <Route path="/devLogin" element={<DevLogin/>} />
            <Route path="/cart" element={<ShoppingCart/>} />
            <Route path="/checkout-success" element={<PaymentSuccess/>} />
            <Route path="/checkout-cancel" element={<PaymentCanceled/>} />
            <Route path="/catalog" element={<Product/>} />
            <Route path="/productsTable" element={<ProductTable/>} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/users" element={<UsersTable/>} />
            <Route path="/createUser" element={<UserForm/>} />
            <Route path="/user/:id" element={<UserForm/>} />
          </Routes>
          <Footer />
        </div>
      </ShoppingCartProvider>
    );
  }
}

export default App;
