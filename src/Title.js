import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  margin-top: 120px;

  & h2 {
    display: inline;
  }

  & span {
    cursor: crosshair;
    display:inline;
    font-weight: bold;
    box-shadow: inset 0 0 0 0 red;
    color: red;
    margin: 0 -.25rem;
    padding: 0 .25rem;
    transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
    font-size: 24px;
  }

  & span:hover {
    box-shadow: inset 90px 0 0 0 red;
    color: white;
  }
`

export default function Title({title, subTitle}) {
  return (
    <Container>
      <h1>{title} </h1><span> {subTitle}</span>
    </Container>
  )
}
