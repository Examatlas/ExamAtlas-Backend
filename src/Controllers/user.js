const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail, validatePhone, validateName, validatePassword } = require("../Utilis/validation");


// signup Api
exports.createUser = async (req, res) => {
    try {
        const { name, email, mobile, password, confirmPassword,role } = req.body;

        if (!name) {
            return res.status(422).json({ status: false, message: "Name is requireed!" })
        }
        if (!email) {
            return res.status(422).json({ status: false, message: "Email is required!" })
        }
        if (!mobile) {
            return res.status(422).json({ status: false, message: "Mobile Number is required!" })
        }
        if (!password) {
            return res.status(422).json({ status: false, message: "password is required!" })
        }
        if (!confirmPassword) {
            return res.status(422).json({ status: false, message: "Confirm password is requried!" })
        }

        const existingEmail = await User.findOne({
            email: email
        })
        if (existingEmail) {
            return res.status(400).json({ status: false, message: "Email already exist!" })
        }

        const existingMobile = await User.findOne({
            mobile: mobile
        })
        if (existingMobile) {
            return res.status(400).json({ status: false, message: "Mobile Number already exist!" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ status: false, message: "password do not match with confirm password!" })
        }

        if (!validateEmail(email)) {
            return res.status(422).json({ status: false, message: "email must contain character,digit and special character!" })
        }

        if (!validatePhone(mobile)) {
            return res.status(422).json({ status: false, message: "Mobile Number is not valid!" })
        }

        if (!validateName(name)) {
            return res.status(422).json({ status: false, message: "Name is not valid!" })
        }

        if (!validatePassword(password)) {
            return res.status(422).json({ status: false, message: "Password must contain uppercase and lowercase , digit and a special character." })
        }

        const bcryptPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            mobile,
            email,
            password: bcryptPassword,
            confirmPassword,
            role
        })
        return res.status(200).json({ status: true, message: "Signup Successfully!!", data: newUser })
    }
    catch (error) {
        console.error(error.message)
        return res.status(500).json({ status: false, message: "internal server error!" })
    }
}



// login api 
exports.login = async (req, res) => {
    try {
        const { mobile, password } = req.body

        if (!mobile) {
            return res.status(422).json({ status: false, message: "Mobile Number is requried!" })
        }

        if (!password) {
            return res.status(422).json({ status: false, message: "password is required!" })
        }

        if (!validatePhone(mobile)) {
            return res.status(400).json({ status: false, message: "Mobile Number is not valid!" })
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                status: false, message: "Password must contain uppercase and lowercase and a special character."
            })
        }

        const existingMobile = await User.findOne({
            mobile: mobile
        })
        if (!existingMobile) {
            return res.status(400).json({ status: false, message: "invalid phone or password!" })
        }

        const isValidPassword = await bcrypt.compare(password,existingMobile.password)
        if(!isValidPassword){
            return res.status(400).json({status:false,message:"invalid phone or password!"
            })
        }

        const token = jwt.sign({userId:existingMobile._Id},process.env.JWT_SECRET,{
            expiresIn:"9d"
        })
        return res.status(200).json({status:true,message:"login Successfully",data:token})
    }

    catch(error){
        console.log(error.message)
        return res.status(500).json({status:true,message:"internal server error!"})
    }
} 



