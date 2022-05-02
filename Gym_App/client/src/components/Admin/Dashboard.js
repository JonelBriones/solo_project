import React, {useState,useEffect} from 'react'
import {Navbar,Nav,NavDropdown,Container,NavLink,NavbarBrand} from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
const Dashboard = (props) => {
    const navigate = useNavigate();
    
    const [loggedAdmin,setloggedAdmin] = useState({})
    const [admin,setAdmin] = useState(false)
    useEffect(()=> {
        axios.get("http://localhost:8000/api/admins/admin",{withCredentials:true})
            .then((res)=>{
                setloggedAdmin(res.data)
                console.log(res.data)
            })
            .catch((err)=>console.log(err))

    },[])

    const logout = () => {
        axios.post("http://localhost:8000/api/admin/logout",{},
        {
            withCredentials:true
        })
            .then((res)=>{
                console.log(res.data)
                navigate("/admin")
            })
            .catch((err)=>console.log(err))
    }
    const redirect = (pages) => {
        navigate(pages);
    }
    return (
        <div>
            <AdminNavbar/>
        </div>
    )
}
export default Dashboard;