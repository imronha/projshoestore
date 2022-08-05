import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route} from 'react-router-dom';
import Detail from "./Detail"; 
import Cart from "./Cart";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(id, sku){
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      itemInCart.quantity++
    })
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1> Welcome to Carved Rock fitness</h1>}></Route>            
            <Route path="/:category" element={<Products/>}></Route>
            <Route path="/:category/:id" element={<Detail/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
