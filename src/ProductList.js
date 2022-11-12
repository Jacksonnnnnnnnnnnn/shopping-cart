import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'
import QuantityBtn from './QuantityBtn'
import Title from './Title'
import styled from 'styled-components'

export default function ProductList() {

  let [productList, setProductList] = useState([])


  useEffect( () => {
    fetch('http://localhost:3004/ProductList')
      .then(res => res.json())
      .then(data => setProductList(data))
  },[])

  
  const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 50px auto;
    width: 95%;
    max-width: 1020px;
  `

  const ContainerItem = styled.div`
    border: 3px solid #f7f7f7;
    border-radius: 7px;
    width: 300px;
    margin: 5px;
    text-align: center;
    background-color: antiquewhite;
    padding: 10px 10px;

    &:hover {
      background-color: rgb(221, 255, 228);
    }

    & img {
      width: 100%;
      height: auto;
      border-radius: 7px;
    }
  `

  const ProductName = styled.div`
    margin-top:15px;
    font-weight: bold;
    font-size: 24px
  `
  

  return (
    <>
      {/* { !showProduct && <button onClick={() => {setShowProduct(true)}}>show</button>}
      { showProduct && <button onClick={() => {setShowProduct(false)}}>hide</button> } */}

      <Title title='Select what you want' subTitle='20% off now !'/>
      <Container>
        {
          productList.map( product => ( 
            <React.Fragment key={product.id}>
              <ContainerItem>

                <Link to={'/productDetail/' + product.id}>
                  <img src={process.env.PUBLIC_URL +'/img/' + product.image} /> <br/>
                </Link>
                <ProductName>
                  {product.jersey} - $ {product.price} 
                </ProductName>
                 <br/>
                 <br/>
                <QuantityBtn productInfo = {product} />

              </ContainerItem> 
            </React.Fragment>
          ))
        }
      </Container>
    </>
  )
}
