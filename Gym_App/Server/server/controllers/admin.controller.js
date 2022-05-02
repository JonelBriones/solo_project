const Admin = require('../models/admin.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
    register: (req,res)=> {
        const admin = new Admin(req.body);
        admin.save()
            .then((newAdmin)=> {
                console.log(newAdmin)
                console.log("Successfully Registered")
                res.json({
                    successMessage: "Thank you for registering",
                    admin: newAdmin
                });
            })
            .catch((err)=> {
                console.log("Register not successfull!")
                res.status(400).json(err);
            })
    },
    login: (req,res)=> {
        Admin.findOne({name: req.body.name})
            .then((adminRecord)=> {
                if(adminRecord === null){
                    res.status(400).json({message:"Invalid Login Attempt"})
                }
                else {
                    bcrypt.compare( req.body.password,adminRecord.password)
                        .then((isPasswordValid)=> {
                            if(isPasswordValid) {
                                console.log("Password is valid")
                                res.cookie(
                                    "admintoken",
                                    jwt.sign(
                                        {
                                            id: adminRecord._id, 
                                            name: adminRecord.name
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly:true,
                                        expires: new Date(Date.now()+ 900000)
                                    },

                                ).json({
                                    message: "Successfully Login",
                                    adminLoggedIn: adminRecord.name,
                                    adminId: adminRecord._id
                                });
                                console.log("Login Successful")
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
    logout: (req,res)=> {
        console.log("logging out");
        res.clearCookie("admintoken");
        res.json({
            message:"You have successfully logged out!"
        })
    },
    getLoggedInAdmin: (req,res) => {
        Admin.findOne({_id:req.jwtpayload.id})
            .then((findLoggedInAdmin)=>res.json(findLoggedInAdmin))
            .catch((err)=>res.json(err))
        },
}




/* ------ CRUD FUNCTIONS ------*/

module.exports.createAdmin= (req,res) => {
    Admin.create(req.body)
        .then((createAdmin)=> {
            res.json(createAdmin)
            console.log(createAdmin);
        })
        .catch((err)=>{
            res.status(400).json(err)
            console.log("Something went wrong in creating admin");
        })
}
module.exports.getAdmin = (req,res) => {
    Admin.findOne({_id:req.params.id})
        .then((findOneAdmin) => {
            res.json(findOneAdmin)
            console.log(findOneAdmin);
        })
        .catch((err)=> {
            res.status(400).json(err)
            console.log("Something went wrong in finding admin");
        })
}
module.exports.updateAdmin = (req,res) => {
    Admin.findOneAndUpdate({_id:req.params.id},req.body)
        .then((updateAdmin) => {
            res.json(updateAdmin)
            console.log(updateAdmin);
        })
        .catch((err)=> {
            res.status(400).json(err)
            console.log("Something went wrong in updating admin");
        })
}
module.exports.getAllAdmins = (req,res) => {
    Admin.find({})
        .then((AllAdmins) => {
            res.json(AllAdmins)
            console.log(AllAdmins);
        })
        .catch((err)=> {
            res.status(400).json(err)
            console.log("Something went wrong in finding all admins");
        })
}

module.exports.deleteAdmin = (req,res) => {
    Admin.deleteOne({_id:req.params.id})
        .then((deleteAdmin) => {
            res.json(deleteAdmin)
            console.log(deleteAdmin);
        })
        .catch((err)=> {
            res.status(400).json(err)
            console.log("Something went wrong in deleting admin");
        })
}