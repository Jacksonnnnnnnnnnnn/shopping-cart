import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductList from "./ProductList"
import ProductDetail from "./ProductDetail"
import Checkout from "./Checkout"
import { CartContext } from "./CartContext"
import React, { useState } from "react"
import styled from 'styled-components'

function App() {

  const [cartItems, setCartItems] = useState([])

  const Nav = styled.nav`
    position: fixed;
    text-align: center;
    top: 0;
    padding: 30px 0px;
    width: 100%;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 57%, rgba(0,108,130,1) 100%);

    & a {
      font-size: 20px;
      text-decoration: none;
      margin: 10px 10px;
      padding: 13px 40px;
      background-color: #fdf9de;
      border-radius: 8px;
      font-weight: bold;
      color: black;
    }

    & a:visited {
      color: black;
    }
  `

  return (
    <div>
      <BrowserRouter>

        <CartContext.Provider value={{ cartItems, setCartItems }}>
          <Nav>
            <Link to="/">Home</Link> 
            <Link to="/checkout">Cart</Link>
          </Nav>          

          <Routes>
            <Route path="/" element={<ProductList/>}/>
            
            <Route path="/productDetail" element={<ProductDetail/>}>
              <Route path=":id" element={<ProductDetail/>}></Route>
            </Route>

            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="*" element={<p>error 404</p>}/>
          </Routes>
        </CartContext.Provider>

      </BrowserRouter>
    </div>
  );
}

export default App;
