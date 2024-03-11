import React, { Component } from "react";
import { Routes, Route} from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Menu from "../components/Menu";
import About from "../components/About";
import ProductDetail from "../components/Products/ProductDetail";
import Footer from "../components/Footer";
import DevLogin from "../components/Helpers/DevLogin";
import ShoppingCart from "../components/Purchase/ShoppingCart";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div id="home">
                    <Home />
                  </div>

                  <div id="home">
                    <Menu />
                  </div>

                  <div id="About us">
                    <About />
                  </div>
                </>
              }
            />
            <Route path="/product/:productId" element={<ProductDetail/>} />
            <Route path="/login" element={<DevLogin/>} />
            <Route path="/cart" element={<ShoppingCart/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
