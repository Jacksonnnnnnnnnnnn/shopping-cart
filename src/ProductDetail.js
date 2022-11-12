import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import Title from './Title'
import styled from 'styled-components'

export default function ProductDetail() {
  
  let params = useParams()
  let [productDetail, setProductDetail] = useState(null)

  // http://localhost:3004/ProductList
  useEffect( () => {
    fetch('http://localhost:3004/ProductList')
      .then(res => res.json())
      .then(data => {
        let productInfo = data.find((element) => {
          return element.id === parseInt(params.id)
        })
        setProductDetail(productInfo)
      })
  },[])

  const ProductDetail = styled.div`
    margin: 10px auto;
    max-width: 950px;
    font-size: 23px;
    font-weight: bold;

    & img {
      width: 350px;
    }

    & td {
      padding: 10px;
    }

    @media(min-wdith: 1000px) {
      
    }

    @media(max-width: 800px) {
      font-size: 20px;
      width: 100%;
    }

    @media(max-width: 680px) {
      font-size: 18px;

      table {
        margin-left: auto;
        margin-right: auto;
      }

      & td {
        display: block;
        text-align: center;
        width: 100%;
      }
      & td:nth-child(2) {

      }
    }
  `
  const BtnBackToList = styled.div`
    background-color: #1c3455;
    font-weight: bold;
    border-radius: 6px;
    margin: 50px auto;
    cursor: pointer;
    padding: 13px 40px;
    text-align: center;
    width: 300px;
    text-align: center;
    color: #FFF;
    text-decoration: none;
  `
  
  return (
    <div>
      { 
        productDetail &&
        <ProductDetail>
          <Title title={'Shirt Infromation : ' + productDetail.jersey} />
          <table>
            <tbody>
              <tr>
                <td align="right">
                  <img src={process.env.PUBLIC_URL +'/img/' + productDetail.image} alt={productDetail.name} width="400"/>
                </td>
                <td width="45%" padding="10">
                  <p>Name: {productDetail.jersey}</p>
                  <p>Price: {productDetail.price}</p>
                  <p>Description: {productDetail.description}</p><br/>
                  <QuantityBtn productInfo={productDetail}/>
                </td>
              </tr>
            </tbody>
          </table>
        </ProductDetail>
      }
      <Link to="/">
        <BtnBackToList>↩️ Product List</BtnBackToList>
        </Link>
    </div>
  )
}
