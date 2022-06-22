import {Navbar,Container,Nav,NavDropdown,NavbarBrand,NavLink} from 'react-bootstrap'
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdminNavbar = (props) => {
    const [loggedAdmin,setLoggedAdmin] = useState({})
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:8000/api/admins/admin",{withCredentials:true})
            .then((res)=>{
                console.log(`Logged in as ${res.data.name}`)
                setLoggedAdmin(res.data)
            })
            .catch((err)=>{
                console.log(err)
                navigate('/admin')
            })
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
    const redirect = (page) => {
        navigate(page)
    }
    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <NavbarBrand onClick={()=>redirect('/admin/dashboard')} className="navbar-home ">Admin Dashboard</NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink onClick={()=>redirect('/admin/store')}>Store</NavLink>
                    <NavLink onClick={()=>redirect('/admin/store/add')}>Add Product</NavLink>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                        {/* {
                            !loggedAdmin._id?
                            <NavDropdown.Item onClick={()=>redirect('/admin')}>Sign in</NavDropdown.Item>:
                            <NavDropdown.Item onClick={()=>redirect('/admin/profile/' + loggedAdmin._id)}>{loggedAdmin.name}</NavDropdown.Item>
                        } */}
                    <NavDropdown.Item onClick={()=>logout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>  
    )
}
export default AdminNavbar;