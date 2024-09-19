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



// user login api 
exports.login = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        console.log(req.body)

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

        console.log("role",existingMobile.role)
        if (existingMobile.role !== 'user') {
            return res.status(403).json({ status: false, message: "Access denied. Only users can login." });
          }
      
        const token = jwt.sign({userId:existingMobile._Id ,  role: existingMobile.role },process.env.JWT_SECRET,{
            expiresIn:"9d"
        })
        return res.status(200).json({status:true,message:"login Successfully",  userId: existingMobile._id ,token})
    }

    catch(error){
        console.log(error.message)
        return res.status(500).json({status:true,message:"internal server error!"})
    }
} 



// Admin Login API
exports.adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(422).json({ status: false, message: "Email and password are required!" });
      }
  
      if (!validateEmail(email)) {
        return res.status(400).json({ status: false, message: "Email Address is not valid!" });
      }
  
      if (!validatePassword(password)) {
        return res.status(400).json({ status: false, message: "Password must contain uppercase, lowercase, digit, and a special character." });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ status: false, message: "Invalid email or password!" });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ status: false, message: "Invalid email or password!" });
      }
  
      if (user.role !== 'admin') {
        return res.status(403).json({ status: false, message: "Access denied. Only admins can login." });
      }
  
      const token = jwt.sign({ userId: user?._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "9d"
      });
  
      return res.status(200).json({ status: true, message: "Admin Login successful",  token });
    
    } catch (error) {
      return res.status(500).json({ status: false, message: "Internal server error!" });
    }
  };



// getuserById

exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId); // Fetch user by ID
      
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
      
      return res.status(200).json({ status: true, message: 'User retrieved successfully', data: user });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ status: false, message: 'Internal server error' });
    }
  };
  

/// get all user
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No user found' });
        }

        res.status(200).json({ message: ' user retrieved successfully', users });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
