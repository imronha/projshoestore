import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route} from 'react-router-dom';
import Detail from "./Detail"; 
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("The cart could not be parsed into JSON.");
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function addToCart(id, sku){
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        // Return new array with matching item replaced
        return items.map((i)=> 
          i.sku === sku ? {...i, quantity: i.quantity + 1} : i
          );
      } else {
        // Return new array with new item appended
        return [...items, { id, sku, quantity: 1}];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      if (quantity === 0) {
        // Tell filter what items we want to keep
        return items.filter((i) => i.sku !== sku)
      }
      return items.map((i) => (i.sku === sku ? {...i, quantity} : i));
    });
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1> Welcome to Carved Rock fitness</h1>}></Route>            
            <Route path="/:category" element={<Products/>}></Route>
            <Route path="/:category/:id" element={<Detail addToCart={addToCart}/>}></Route>
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity}/>}></Route>
            <Route path="/checkout" element={<Checkout cart={cart} emptyCart={emptyCart}></Checkout>}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
