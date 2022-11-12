import React, { useContext } from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import { CartContext } from './CartContext'
import styled from 'styled-components'

export default function Checkout() {

  let {cartItems} = useContext(CartContext)
  let isEmpty = cartItems.length <= 0 ? true : false

  let initialValue = 0
  let grandTotal = cartItems.reduce((total, product) => {
    return total += product.price * product.quantity
  }, initialValue)
  const freeShippingPrice = 1000

  const NothingInCart = styled.div`
    font-size: 24px;
    margin-top: 40px;
    text-align: center;
    color: #BD2A2E;

    & a {
      text-decoration: none;
      color: blue;
    }
  `

  const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 50px auto;
    width: 95%;
    max-width: 1020px;
    
  `
  const CartSection = styled.div`
    width: 70%;
    @media(max-width: 960px) {
      width: 90%;   
    }

    @media(max-width: 750px) {
      width: 100%;   
    }
  `
  
  const CheckoutTable = styled.table`
    width: 100%;
    text-align: left;
    border-spacing: 0px;

    & tr {
      background-color: antiquewhite;
      margin: 10px 10px;
    }

    & td {
      padding:0px;
      font-size: 20px;
    }

    & img {
      width: 150px;
      margin: 15px;
    }

    @media(max-width: 750px) {
      td:nth-child(4) {
        display: none;
      }
    }

    @media(max-width: 510px) {
      td:nth-child(2) {
        display: none;
      }
    }
    
  `

  const ProductSubTotal = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-right: 30px;
  `

  const CheckoutSection = styled.div`
    width: 30%;
    font-size: 20px;
    text-align: center;

    & div {
      margin: 20px 12px;
    }
  `

  const GrandTotal = styled.div`
    font-size: 42px;
    font-weight: bold;
  `

  const FreeShipping = styled.div`
    font-weight: bold;
    color: forestgreen;
    font-size: 25px;
  `

  const NoShipping = styled.div`
    color: brown;
    font-weight: bold;
  `

  return (
    <>
      <Title title='Checkout'/>
      {
        isEmpty &&
        <NothingInCart>
          Cart is empty <br/>
          <Link to="/">Go shopping now <span>&#128722;</span></Link>
        </NothingInCart>


      }

      { !isEmpty &&
        <Container>
          <CartSection>
            {/* cart info */}
            <CheckoutTable>
              <tbody>
              {
                // cartItems[0].description
                cartItems.map( product => (
                  <tr key={product.id}>
                    <td>
                      <Link to={'/productDetail/' + product.id}>
                        <img src={process.env.PUBLIC_URL +'/img/' + product.image} /> <br/>
                      </Link>
                    </td>
                    <td>
                      Jersey: {product.jersey} <br/>
                      Price: {product.price} <br/>
                      Quantity: {product.quantity}
                    </td>
                    <td width ="200">
                      <QuantityBtn productInfo={product}/>
                    </td>
                    <td>
                      <ProductSubTotal>
                        ${product.price*product.quantity}
                      </ProductSubTotal>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </CheckoutTable>
          </CartSection>
          <CheckoutSection>
            <h2>Totol: </h2>
            <GrandTotal>$ {grandTotal}</GrandTotal>
            {
              /*  isFreeShip */
              grandTotal >= freeShippingPrice ? 
              <FreeShipping>Free shipping !</FreeShipping> :
              <NoShipping>
                Orders of ${freeShippingPrice} for FREE Shipping<br/>
                Short by ${freeShippingPrice - grandTotal} 
              </NoShipping>
            
            }
          </CheckoutSection>
        </Container>
      }

    </>
  )
}
