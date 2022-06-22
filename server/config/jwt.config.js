const jwt = require("jsonwebtoken");

module.exports = {
    authenticate(req, res, next) {
        jwt.verify(req.cookies.admintoken,
            process.env.JWT_SECRET,
            (err, payload)=>{
                if(err){
                    // console.log(err);
                    res.status(401).json({verified:false})
                    console.log("Admin Only")
                }
                else {
                    console.log(payload);
                    req.jwtpayload = payload;
                    next()
                }
            }
            )
    },
    authenticateUser(req, res, next) {
        jwt.verify(req.cookies.usertoken,
            process.env.JWT_SECRET,
            (err, payload)=>{
                if(err){
                    // console.log(err);
                    res.status(401).json({verified:false})
                    console.log("User Only")
                }
                else {
                    req.jwtpayload = payload;
                    next()
                }
            }
            )
    }
}