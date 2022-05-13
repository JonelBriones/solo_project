const Product = require('../models/product.model');
const jwt = require("jsonwebtoken");
const Admin = require('../models/admin.model');
/* ------ CRUD FUNCTIONS ------*/

module.exports = {
    createProduct: (req,res) => {
        const newProductObject = new Product(req.body);

        // const decodedJWT = jwt.decode(req.cookies.admintoken,{
        //     complete:true
        // })
        // newProductObject.createdBy = decodedJWT.payload.id
        newProductObject.createdBy = req.jwtpayload.id;

        newProductObject.save()
            .then((createProduct)=> {
                res.json(createProduct)
                console.log(createProduct);
            })
            .catch((err)=>{
                res.status(400).json(err)
                console.log("Something went wrong in creating product");
            })
    },
    getProduct: (req,res) => {
        Product.findOne({_id:req.params.id})
            .then((findOneProduct) => {
                res.json(findOneProduct)
                console.log(findOneProduct);
            })
            .catch((err)=> {
                res.status(400).json(err)
                console.log("Something went wrong in finding product");
            })
    },
    updateProduct: (req,res) => {
        Product.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
            .then((updateProduct) => {
                res.json(updateProduct)
                console.log(updateProduct);
            })
            .catch((err)=> {
                res.status(400).json(err)
                console.log("Something went wrong in updating product");
            })
    },
    getAllProducts: (req,res) => {
        Product.find()
            // .populate("createdBy","adminName")
                .then((AllProducts) => {
                    res.json(AllProducts)
                    console.log(AllProducts);
                })
                .catch((err)=> {
                    res.status(400).json(err)
                    console.log("Something went wrong in finding all products");
                })
    },
    deleteProduct: (req,res) => {
        Product.deleteOne({_id:req.params.id})
            .then((deleteProduct) => {
                res.json(deleteProduct)
                console.log(deleteProduct);
            })
            .catch((err)=> {
                res.status(400).json(err)
                console.log("Something went wrong in deleting product");
            })
    },
    
    // Only that admin whos logged in have special actions
    findAllProductsByAdmin: (req,res) => {
        if(req.jwtpayload.adminName !== req.params.adminName){
            Admin.findOne({adminName:req.params.adminName})
                .then((adminNotLoggedIn)=>{
                    Product.find({createdBy:adminNotLoggedIn._id})
                        .then((allProductsFromAdmin)=>{
                            console.log(allProductsFromAdmin);
                            res.json(allProductsFromAdmin);
                        })
                        .catch((err)=> {
                            console.log(err);
                            res.status(400).json(err);
                        })
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
        else {
            Product.find({createdBy: req.jwtpayload.id})
                .then((allProductsFromAdmin)=>{
                    console.log(allProductsFromAdmin)
                    res.json(allProductsFromAdmin);
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    }
}