const Course = require("../Models/Courses");

exports.createCourse = async(req,res)=>{
    try{
        const{title,price,security} =  req.body;
        if(!title){
            return res.status(422).json({status:false,message:"title is requried!"})
        }
        if(!price){
            return res.status(422).json({status:false,message:"price is required!"})
        }
        // if(!security){
        //     return res.status(422).json({status:false,message:"security is required!"})
        // }

        const newCourse = await Course.create({
            title,
            price,
            // security
        })
        return res.status(200).json({status:true,message:"course created successfully!",newCourse})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}



// get all courses
exports.getAllCourses = async(req,res)=>{
    const course = await Course.find()
    try{
    
    if(course.length == 0){
        return res.status(404).json({status:false,message:"course not found !!"})
    }
    return res.status(200).json({status:true,message:"course fetched successfully!!",course})

    } catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error"})
    }
}