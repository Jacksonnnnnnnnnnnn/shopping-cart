import React, { useState, useContext } from 'react'
import { CartContext } from './CartContext'
import styled from 'styled-components'

export default function QuantityBtn({productInfo}) {

  const {cartItems, setCartItems} = useContext(CartContext)

  // check 購物車有無該產品
  let productIndexInCart = cartItems.findIndex((element) => {
    return element.id === productInfo.id
  })

  let [numInCart, setNumInCart] = useState(
    (productIndexInCart === -1) ? 0 : cartItems[productIndexInCart].quantity
  )

  const handleAdd = () => {

    if (productIndexInCart === -1) {
      // create new obj
      setCartItems([
        {
          id: productInfo.id,
          jersey: productInfo.jersey,
          image: productInfo.image,
          price: productInfo.price,
          description: productInfo.description,
          quantity: 1
        },
        ...cartItems
      ])
      
    } else {
      // + quantity only
      let newCartArray = [...cartItems]
      newCartArray[productIndexInCart].quantity++
      setCartItems(newCartArray)
      
    }

    console.log(cartItems)

    setNumInCart(numInCart+1)
  }
  const handleSubract = () => { 
    if (cartItems[productIndexInCart].quantity === 1) {
      // remain 1 -> remove obj
      let newCartArray = [...cartItems]
      newCartArray.splice(productIndexInCart, 1)
      setCartItems(newCartArray)
    } else {
      // just subract
      let newCartArray = [...cartItems]
      newCartArray[productIndexInCart].quantity--
      setCartItems(newCartArray)
    }
    setNumInCart(numInCart-1)
  }

  const AddToCart = styled.div`
    display: block;
    width: 80%;
    margin: 25px auto;
    font-size: 20px;
    font-weight: bold;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -webkit-touch-callout : none;
    -moz-user-select: none;
    -o-user-select: none;
  `

  const BtnAddToCart = styled.span`
    padding: 15px 20px;
    border-radius: 6px;
    background-color: #1c3455;
    color: #FFF;
    cursor: pointer;
  `

  const BtnSubtract = styled.span`
    background-color: #1c3455;
    font-weight: bold;
    color: #FFF;
    border-radius: 6px;
    padding: 5px 10px;
    margin-right: 7px;
    margin-left: 10px;
    cursor: pointer;
  `

  const BtnAdd = styled.span`
    background-color: #1c3455;
    font-weight: bold;
    color: #FFF;
    border-radius: 6px;
    padding: 5px 10px;
    margin-left: 7px;
    margin-right: 7px;
    cursor: pointer;
  `

  return (
    <AddToCart>
      { 
        (numInCart === 0) ?
        <BtnAddToCart onClick={handleAdd}>Add {productInfo.jersey} To Cart</BtnAddToCart> :
        <div>
          <BtnSubtract onClick={handleSubract}>- </BtnSubtract>
            {numInCart}
          <BtnAdd onClick={handleAdd}> +</BtnAdd>
        </div>
      }
    </AddToCart>
  )
}
