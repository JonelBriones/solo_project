import React, {useState,useEffect} from 'react'
import axios from 'axios';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../Admin/AdminNavbar';
const CreateProduct = (props) => {
    const [loggedAdmin,setloggedAdmin] = useState([])
    const [errors,setError] = useState({});
    const navigate = useNavigate();
    const [product,setProduct] = useState([])
    const onSubmitHandler = (e) => {
        e.preventDefault();
            axios.post("http://localhost:8000/api/admin/product/add",product,
            {
                withCredentials:true // Only Admin can access this link
            })
            .then((res)=>{
                console.log(res.data)
                setProduct({
                    name: "",
                    description: "",
                    category: "",
                    price: ""
                })
                setError({})
                navigate("/admin/store");
            })
            .catch((err)=> {
                console.log(err.response.data.errors)
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
            
            <h1>Create Product</h1>
            
            <ProductForm
            product={product}
            onChangeHandler={onChangeHandler}
            onSubmitHandler={onSubmitHandler}
            errors={errors}
            buttonText={"Add Product"}
            />
        </div>
    )
    
}
export default CreateProduct;