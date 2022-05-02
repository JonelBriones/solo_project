import React, {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import {useNavigate,useParams,Link} from 'react-router-dom'
import {NavbarBrand,Navbar,Container,Nav,NavLink,NavItem,NavDropdown} from 'react-bootstrap'
import CartContext from '../CartContext';

const GymNavbar = (props) => {
    const {cartQty} = useContext(CartContext);
    const {buttonText,cartCount} = props;
    const [loggedUser,setLoggedUser] = useState({})
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/user",{withCredentials:true})
            .then((res)=>{
                console.log(`Logged in as ${res.data.firstName} ${res.data.lastName}`)
                setLoggedUser(res.data)
            })
            .catch((err)=>{
                console.log(err)
                // navigate('/users')
            })
    },[])
    const logout = () => {
        axios.post("http://localhost:8000/api/users/logout",{},
        {
            withCredentials:true
        })
            .then((res)=>{
                console.log(res.data)
                navigate("/users")
            })
            .catch((err)=>console.log(err))
    }
    const redirect = (page) => {
        navigate(page)
    }
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <NavbarBrand onClick={()=>redirect('/')} className="navbar-home">Home</NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink onClick={()=>redirect('/store')}>Store</NavLink>
                    <NavLink onClick={()=>redirect('/cart')}>Cart<span> ({cartQty})</span></NavLink>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                        {
                            !loggedUser._id?
                            <NavDropdown.Item onClick={()=>redirect('/users')}>Sign in</NavDropdown.Item>:
                            <NavDropdown.Item onClick={()=>redirect('/profile/' + loggedUser._id)}>{loggedUser.firstName + " " + loggedUser.lastName}</NavDropdown.Item>
                        }
                    <NavDropdown.Item onClick={()=>logout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}   
export default GymNavbar;