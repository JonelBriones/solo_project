import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {Table,Button} from 'react-bootstrap'
import { Link,useNavigate,useParams } from 'react-router-dom'
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
const AdminViewProduct = (props) => {
    const navigate = useNavigate();
    const [product,setProduct] = useState([])
    const {id} = useParams();
    useEffect(()=> {
        axios.get("http://localhost:8000/api/products/product/" + id)
            .then((res)=>{
                console.log(res.data)
                setProduct(res.data)
            })
            .catch((err)=>{console.log(err)})
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

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/products">Store</Nav.Link>
                        <Nav.Link href="/products/add">Add Product</Nav.Link>
                        <Nav.Link href="/cart">Cart</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={()=>logout()}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Button href="/products">Go Back</Button>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Description:</th>
                        <th>Category:</th>
                        <th>Price:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                    </tr>
                </tbody>
            </Table>
        </div>

    )
}

export default AdminViewProduct;