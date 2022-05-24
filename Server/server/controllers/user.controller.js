const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
    register: (req,res)=> {
        const user = new User(req.body);
        user.save()
            .then((newUser)=> {
                console.log(newUser)
                console.log("Successfully Registered")
                res.json({
                    successMessage: "Thank you for registering",
                    user: newUser
                });
            })
            .catch((err)=> {
                console.log("Register not successfull!")
                res.status(400).json(err);
            })
    },
    login: (req,res)=> {
        User.findOne({email: req.body.email})
            .then((userRecord)=> {
                if(userRecord === null){
                    res.status(400).json({message:"Invalid Login Attempt"})
                }
                else {
                    bcrypt.compare(req.body.password,userRecord.password)
                        .then((isPasswordValid)=> {
                            if(isPasswordValid) {
                                console.log("Password is valid")
                                res.cookie(
                                "usertoken",
                                    jwt.sign(
                                        {
                                            //data saved to server when logged in
                                            id: userRecord._id, 
                                            email: userRecord.email,
                                            firstName: userRecord.firstName,
                                            lastName: userRecord.lastName,
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly:true,
                                        expires: new Date(Date.now()+ 90000000)
                                    },

                                ).json({
                                    message: "Successful Login",
                                    userLoggedIn: userRecord.firstName + " " + userRecord.lastName,
                                    userId: userRecord._id
                                });
                            }
                            else {
                                res.status(400).json({
                                    message:"Invalid Login Attempt"
                                })
                            }
                        })
                        .catch((err)=>{
                            console.log(err)
                            res.status(400).json({message:"Invalid Login Attempt"})
                        })
                }
            })
            .catch((err)=> {
                console.log(err)
                res.status(400).json({message:"Invalid Login Attempt"})
            })
    },
    // removes id when logged out
    logout(req,res) {
        res.cookie("usertoken",jwt.sign({_id: ""},process.env.JWT_SECRET),{
            httpOnly:true,
            maxAge: 0
        })
        .json({message: "You have successfully logged out!"});
    },
    getLoggedInUser(req,res) {
        const decodedJwt = jwt.decode(req.cookies.usertoken,{complete:true})
        User.findOne({_id:decodedJwt.payload.id})
        .then((findLoggedInUser)=>res.json(findLoggedInUser))
        .catch((err)=>res.json(err))
    },
    getOneUser: (req,res) => {
        User.findOne({_id: req.params.id})
            .then((oneUser)=> {
                console.log(oneUser)
                res.json(oneUser)
            })
            .catch((err)=> {
                console.log(err)
                res.status(400).json(err)
            })
        },
        // logout2: (req,res)=> {
    //     console.log("logging out");
    //     res.clearCookie("usertoken");
    //     res.json({
    //         message:"You have successfully logged out!"
    //     })
    // },
    
    // retrieves data by jtwtoken
    // getLoggedInUser: (req,res) => {
    // User.findOne({_id: req.jwtpayload.id})
    //     .then((user)=>res.json(user))
    //     .catch((err)=>res.json(err))
    // },
    updateUser: (req,res) => {
    User.findOneAndUpdate({_id:req.params.id},req.body)
        .then((updateUser) => {
            res.json(updateUser)
            console.log(updateUser);
        })
        .catch((err)=> {
            res.status(400).json(err)
            console.log("Something went wrong in updating user");
        })
    },
    // getAllUsers: (req,res) => {
    // User.find({})
    //     .then((allUsers) => {
    //         res.json(allUsers)
    //         console.log(allUsers);
    //     })
    //     .catch((err)=> {
    //         res.status(400).json(err)
    //         console.log("Something went wrong in finding all users");
    //     })
    // },   
    // deleteUser: (req,res) => {
    // User.deleteOne({_id:req.params.id})
    //     .then((deleteUser) => {
    //         res.json(deleteUser)
    //         console.log(deleteUser);
    //     })
    //     .catch((err)=> {
    //         res.status(400).json(err)
    //         console.log("Something went wrong in deleting user");
    //     })
    // }
}