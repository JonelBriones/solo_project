import React, {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import { useNavigate,Link } from 'react-router-dom'
import CartContext from '../../CartContext'
import AdminNavbar from './AdminNavbar'
import ProductsData from '../../ProductsData'
const AdminStore = (props) => {
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
            <AdminNavbar/>
            <div className="container">
            <h1>Admin Store</h1>
            <hr/>
            <p>Products below are used for demo purposes.</p>
            <hr/>
            <div className='product-flex-container'>
            {
                product.map((oneProduct)=> (
                        <div key={oneProduct._id}>
                            <div className="product-view"onClick={()=>redirect(`${oneProduct.name}`)}>
                                <div className='product-image'
                                    style={{backgroundImage: `url(${oneProduct.image})`}}>           
                                        <div className="product">
                                            <div className='product-content'>
                                                <div>{oneProduct.name}</div>
                                                <div>${oneProduct.price}.00</div>
                                            </div>
                                        </div>
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
export default AdminStore;