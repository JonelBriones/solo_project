import React, {useState} from 'react'
import axios from 'axios';
import UserForm from '../components/User/UserForm';
import { useNavigate } from 'react-router-dom';
import UserLogin from '../components/User/UserLogin';
import GymNavbar from './GymNavbar';
const UserRegistration = (props) => {
    const navigate = useNavigate();
    const [confirmReg,setConfirmReg] = useState("");
    const [errors,setError] = useState({});
    const [loginPage,setLoginPage] = useState(false)
    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/register",
        user,
        {
            withCredentials:true
        })
            .then((res)=>{
                console.log(res.data)
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    confirmPassword: "",
                    password: "",
                    address: "",
                    apartment: "",
                    city: "",
                    countryOrRegion: "",
                    state: "",
                    zipcode: "",
                    phone: "",
                })
                setConfirmReg(
                    "Thank you for Registering, you can now log in!"
                )
                setError({})
                // navigate("/");
            })
            .catch((err)=> {
                console.log(err.response.data.errors)
                setError(err.response.data.errors)
            })
    }
    const onChangeHandler = (e) => {
        const newUserObject = {...user};
        newUserObject[e.target.name] = e.target.value;
        console.log(newUserObject);
        setUser(newUserObject);

    }

    /* USER LOGIN */
    const [userData,setUserData] = useState("")
    const [errorsLogin,setErrorLogin] = useState("");
    const [userLogin,setUserLogin] = useState({
        email: "",
        password: "",
    });
    const onSubmitHandlerLogin = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/login",
        userLogin,
        {
            withCredentials:true
        })
            .then((res)=>{
                console.log(res.data)
                navigate("/");
                // setUserData(res.data)
            })
            .catch((err)=> {
                console.log(err.response.data.message)
                setErrorLogin(err.response.data.message)
                setUserLogin({
                    email: "",
                    password: ""
                })
            })

    }
    

    const onChangeHandlerLogin = (e) => {
        const newUserObject = {...userLogin};
        newUserObject[e.target.name] = e.target.value;
        console.log(newUserObject);
        setUserLogin(newUserObject);
    }


    return (
        <div>
            <GymNavbar/>
            <button className='btn-no-item' onClick={()=>setLoginPage(!loginPage)}>{loginPage?'Sign Up':'Login'}</button>
                {
                    !loginPage?
                    <div className="reg-container">
                        <UserForm
                        onSubmitHandler={onSubmitHandler}
                        onChangeHandler={onChangeHandler}
                        user={user}
                        errors={errors}
                        confirmReg={confirmReg}
                        buttonText={'Sign Up'}
                        />
                    </div>:
                <div className="log-container">
                    <div className="userLog">
                    <UserLogin
                    onSubmitHandler={onSubmitHandlerLogin}
                    onChangeHandler={onChangeHandlerLogin}
                    user={userLogin}
                    errors={errorsLogin}
                    buttonText={'Login'}
                    />
                    </div>
                </div>
                }
            </div>
    )
}
export default UserRegistration;