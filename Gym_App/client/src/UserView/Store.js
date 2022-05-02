import React, {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import { useNavigate,Link } from 'react-router-dom'
import CartContext from '../CartContext';
import GymNavbar from './GymNavbar';

import ProductsData from '../ProductsData';
const Store = (props) => {
    const {products} = props;
    const [product,setProduct] = useState([])
    const navigate = useNavigate();
    const {cart,addToCart,removeFromCart} = useContext(CartContext)
    useEffect(()=> {
        axios.get("http://localhost:8000/api/products")
            .then((res)=>{
                console.log(res.data)
                setProduct(res.data)
            })
            .catch((err)=>console.log(err))

    },[])
    const redirect = (page) => {
        navigate(page)
    }
    return (
        <>
            <GymNavbar/>
            <div className="container">
            <h1>Store</h1>
            <hr/>
            <p>Products below are used for demo purposes.</p>
            <hr/>
            <div className='product-flex-container'>
            {
                product.map((oneProduct)=> (
                        <div key={oneProduct._id}>
                            <Button className='btn-add' variant="info" size="sm"  onClick={()=>addToCart(oneProduct)}>Add 
                            ({
                                cart.map((product)=>(
                                    product._id === oneProduct._id?
                                    product.qty:null
                                    ))
                                })
                            </Button >
                            <div className="product-view">
                                <div className='product-image'
                                    style={{backgroundImage: `url(${oneProduct.image})`}}>           
                                        <div className="product">
                                            <div className='product-content' onClick={()=>redirect(`${oneProduct.name}`)}>
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
            {/* <ProductsData/>       */}
        </>
    )
}
export default Store;