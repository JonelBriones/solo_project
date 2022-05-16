import React, {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {Table,Button} from 'react-bootstrap'
import { Link,useNavigate,useParams } from 'react-router-dom'
import CartContext from '../../CartContext'
import AdminNavbar from './AdminNavbar'
const AdminViewProduct = (props) => {
    const navigate = useNavigate();
    const [product,setProduct] = useState([])
    // const {product_name} = useParams();
    const {product_id} = useParams();
    const {cart,addToCart,removeFromCart} = useContext(CartContext);
    useEffect(()=> {
        axios.get("http://localhost:8000/api/product/" + product_id)
            .then((res)=>{
                console.log(res.data)
                setProduct(res.data)
            })
            .catch((err)=>{console.log(err)})
    },[])

    const redirect = (page) => {
        navigate(page)
    }
    const onDeleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/admin/products/${id}`,{withCredentials:true})
            .then((res)=> {
                // successCallback();
                // disconnect before leaving
                navigate("/admin/store");

            })
            .catch(err=> {
                console.log(err);
            })
    }
    const removeFromDom = (productId) => {
        console.log("Delete: ",productId)
        navigate("/admin/store")
    }
    return (
        <>
            <AdminNavbar/>
            <div className="container">
                <div className='product-view-container'>
                    <div className="product-view-img" style={{backgroundImage: `url(${product.image})`,
                                    }}>
                    </div>
                    <div className='product-view-content'>
                        <h1>{product.name}</h1>
                        <hr></hr>
                        <h2>{product.price}</h2>
                        <p>{product.description}</p>
                        <hr/>
                        <p>Product above are used for demo purposes.</p>
                        <Button className='btn-add' variant="danger" size="sm" 
                        onClick={()=>onDeleteHandler(product._id)}>Delete </Button >
                        <hr/>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminViewProduct;