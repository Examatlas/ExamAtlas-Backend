const jwt = require("jsonwebtoken")
const User = require("../Models/user")


//Authentication
exports.isAuthenticated = async(req,res,next)=>{
    const token = req.headers["x-api-key"]

    if(!token){
        return res.status(422).json({status:false,message:"token is required"})
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decodedData)
    console.log(decodedData.userId)

    req.user = await User.findById(decodedData.userId)
    console.log(req.user)

    next();
}



// authorization 
exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(400).json({ 
                status:false,
                message: `${req.user.role} is not allowed to access this other user's data.`
            })
        }
        next();
    }
}

