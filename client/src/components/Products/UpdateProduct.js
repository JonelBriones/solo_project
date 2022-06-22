import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import { useNavigate,useParams } from 'react-router-dom';
import AdminNavbar from '../Admin/AdminNavbar';
const UpdateProduct = () => {
    const navigate = useNavigate();
    const {productId} = useParams();

    const [errors,setError] = useState({});
    const [product,setProduct] = useState({
        name: "",
        description: "",
        category: "",
        image: "",
        price: "",
    })

    useEffect(()=> {
        axios.get("http://localhost:8000/api/product/" + productId)
            .then((res)=>{
                console.log(res.data)
                setProduct(res.data)
            })
            .catch((err)=>{console.log(err)})
    },[])

    const updateHandler = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/admin/products/edit/" + productId,product,
        {withCredentials:true})
            .then((res)=>{
                console.log(res.data)
                navigate("/admin/store")
            })
            .catch((err)=>{
                console.log(err)
                console.log("Response Error:",err.response)
                console.log("Response Object Validation:",err.response.data.errors)
                setError(err.response.data.errors)
            })
    }

    const onChangeHandler = (e) =>{
        const newProductObject = {...product};
        newProductObject[e.target.name] = e.target.value;
        console.log(newProductObject);
        setProduct(newProductObject);
    } 

    return (
        <div>
            <AdminNavbar/>
            
            <h1>Update Product</h1>
            
            <ProductForm
            product={product}
            onChangeHandler={onChangeHandler}
            onSubmitHandler={updateHandler}
            errors={errors}
            buttonText={"Update Product"}
            />
        </div>
    )
}
export default UpdateProduct;