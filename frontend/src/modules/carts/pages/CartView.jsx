import React from 'react'
import { Cart } from '../components/Cart'

export const CartView = ({ address }) => {
  return (
    <>
        <Cart address={address}/>
    </>
  )
}
