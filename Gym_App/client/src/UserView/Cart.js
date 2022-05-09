import React, {useState,useContext} from 'react'
import CartContext from '../CartContext';
import GymNavbar from './GymNavbar';
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap'
const Cart = (props) => {
    const {cart,addToCart,removeFromCart,cartQty,itemsPrice} = useContext(CartContext)

    const navigate = useNavigate();
    const redirect = (page) => {
        navigate(page)
    }
    return (
        <div>
            <GymNavbar/>
            <div className='container'>
            <h1>Shopping Cart </h1>
            <span>{cartQty > 0?<button className='btn-no-item' onClick={()=>redirect(`/store/checkout`)}>Checkout</button>:null}</span>
            <hr/>
                {
                    cartQty===0?
                    <>
                <p>There are no items in your cart.</p>
                    <hr/>
                    <button className='btn-no-item' onClick={()=>redirect(`/store`)}>Continue Shopping</button>
                    </>
                :null

                }
            <div className='product-flex-container'>
            {
                cart.map((oneProduct)=> (
                        <div key={oneProduct._id}>
                            <Button className='btn-add' variant="info" size="sm"  onClick={()=>addToCart(oneProduct)}>Add 
                            ({
                                cart.map((product)=>(
                                    product._id === oneProduct._id?
                                    product.qty:null
                                    ))
                                })
                            </Button >
                            <div className="product-view" onClick={()=>redirect(`/store/${oneProduct.name}`)}>
                                <div className='product-image'
                                    style={{backgroundImage: `url(${oneProduct.image})`}}>           
                                        <div className="product">
                                            <div className='product-content'>
                                                <div>{oneProduct.name}</div>
                                                <div>${oneProduct.price}.00</div>
                                            </div>
                                        </div>
                                    {
                                    cart.map((product)=>(
                                        product._id === oneProduct._id?
                                        product.qty?
                                        <Button key={product._id} variant="danger" size="sm" onClick={()=>removeFromCart(oneProduct)}>Remove</Button>:null:null
                                        ))
                                    } 
                                </div>
                            </div>
                        </div>
                ))
            }
            </div>
            </div>
        </div>
    )
}
export default Cart;
