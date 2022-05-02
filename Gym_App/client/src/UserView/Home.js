import React, {useState,useEffect} from 'react';
import GymNavbar from './GymNavbar';
import {Button} from 'react-bootstrap'
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom'
const Home = (props) => {
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
            })
    },[])
    return (
        <>
            <GymNavbar/>
                <div className="index">
                    <header>
                        <div className='home-img'>
                            <div className='home-content'>
                                {/* <img src="../../images/samuel-girven-fqMu99l8sqo-unsplash.jpg"/> */}
                                {/* <img className="home-img" src={img}/> */}
                                {
                                    !loggedUser.firstName?
                                    <>
                                <h1>Gym Name</h1>
                                    <Button href="/users">Join us</Button>
                                    </>:
                                    <h1>Welcome back! {loggedUser.firstName}</h1>
                                    
                                }
                            </div>
                        </div>
                    </header>
                </div>
        </>
    )
}
export default Home;