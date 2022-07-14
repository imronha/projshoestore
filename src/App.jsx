import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from './Spinner';
import useFetch from "./services/useFetch";
 


export default function App() {
  // Decalre state called size using destructuring. Default size to empty string
  const [size, setSize] = useState("");
  const {data: products, loading, error} = useFetch(
    "products?category=shoes"
  )
  // Can also declare state this way:
  /*
  const state = useState("");
  const size = state[0];
  const setSize = state[1];
  */


  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  // Derived state
  const filteredProducts = size ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size))) : products;

  if (error) {
    throw error;
  }

  if (loading) {
    return <Spinner/>;
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={ (e)=> setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            { size && <h2>Found {filteredProducts.length} items.</h2>}
          </section>
          <section id="products"> {filteredProducts.map(renderProduct)} </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
