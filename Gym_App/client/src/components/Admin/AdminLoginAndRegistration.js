import React, {useState,useEffect} from 'react'
import axios from 'axios';
import AdminLogin from './AdminLogin';
import AdminForm from './AdminForm';
import { useNavigate } from 'react-router-dom';
const AdminLoginAndRegistration = (props) => {
    const navigate = useNavigate();


    /* ------- ADMIN REGISTRATION -------- */

    const [confirmReg,setConfirmReg] = useState("");
    const [adminRegistrationErrors,setAdminRegistrationError] = useState({});
    const [adminRegistration,setAdminRegistration] = useState({
        name: "",
        password: "",
        confirmPassword: ""
    });
    const onSubmitHandlerAdminRegistration = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/admin/register",
        adminRegistration,
        {
            withCredentials:true
        })
            .then((res)=>{
                console.log(res.data)
                setAdminRegistration({
                    name: "",
                    password: "",
                    confirmPassword: ""
                })
                setConfirmReg(
                    "Thank you for Registering, you can now log in!"
                )
                setAdminRegistrationError({})
                // navigate("/");
            })
            .catch((err)=> {
                console.log(err.response.data.errors)
                setAdminRegistrationError(err.response.data.errors)
            })
    }
    const onChangeHandlerAdminRegistration = (e) => {
        const newAdminObject = {...adminRegistration};
        newAdminObject[e.target.name] = e.target.value;
        console.log(newAdminObject);
        setAdminRegistration(newAdminObject);

    }


    /* ------- ADMIN LOGIN -------- */

    const [adminLoginErrors,setAdminLoginError] = useState("");
    const [adminLogin,setAdminLogin] = useState({
        name: "",
        password: "",
    });
    const onSubmitHandlerAdminLogin = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/admin/login",
        adminLogin,
        {
            withCredentials:true
        })
            .then((res)=>{
                console.log(res.data)
                navigate("/dashboard");
            })
            .catch((err)=> {
                console.log(err.response.data.message)
                setAdminLoginError(err.response.data.message)
                setAdminLogin({
                    name: "",
                    password: "",
                })
            })
    }
    const onChangeHandlerAdminLogin = (e) => {
        const newAdminObject = {...adminLogin};
        newAdminObject[e.target.name] = e.target.value;
        console.log(newAdminObject);
        setAdminLogin(newAdminObject);

    }


    return (
        <div>
            <h1>Admin Login & Registration</h1>
            {
                confirmReg?
                <h1>{confirmReg}</h1>:
                null
            }
            <div className="container">
                    <AdminForm
                    onSubmitHandler={onSubmitHandlerAdminRegistration}
                    onChangeHandler={onChangeHandlerAdminRegistration}
                    admin={adminRegistration}
                    errors={adminRegistrationErrors}
                    confirmReg={confirmReg}
                    buttonText={'Sign Up'}
                    />
                    <AdminLogin
                    onSubmitHandler={onSubmitHandlerAdminLogin}
                    onChangeHandler={onChangeHandlerAdminLogin}
                    admin={adminLogin}
                    errors={adminLoginErrors}
                    buttonText={'Login'}
                    />  
            </div>
        </div>
        
    )
}
export default AdminLoginAndRegistration;