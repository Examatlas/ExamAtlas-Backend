const Category = require("../Models/Category");

exports.createCategory = async(req,res)=>{
    try{
        const {category , description , tags} = req.body;
        if(!category){
            return res.status(422).json({status:false,message:"category name is required!"})
        }
        if(!description){
            return res.status(422).json({status:false,message:"description is required!"})
        }
        if(!tags){
            return res.status(422).json({status:false,message:"tags is required!"})
        }

        const NewCategory = await Category.create({
            category,
            description,
            tags
        })
        return res.status(200).json({status:true,message:"category created successfully",data:NewCategory})

    }catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,mesage:"internal server error"})
    }
}




// get category by id 

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if category ID is provided
    if (!id) {
      return res.status(400).json({ status: false, message: "Category ID is required!" });
    }

    // Fetch category by ID
    const category = await Category.findById(id);

    // If no category found, return 404
    if (!category) {
      return res.status(404).json({ status: false, message: "Category not found!" });
    }

    // Success response with category data
    return res.status(200).json({ status: true, message: "Category fetched successfully", data: category });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// create subCategory
exports.subCategory = async(req,res)=>{
    try{
        const{category,subCategory,description,tags} = req.body;
        if(!category){
            return res.status(422).json({status:false,mesasge:"category is required!"})
        }
        if(!subCategory){
            return res.status(422).json({status:false,message:"subCategory is required!"})
        }
        if(!description){
            return res.status(422).json({status:false,message:"description is required!"})
        }
        if(!tags){
            return res.status(422).json({status:false,message:"tags is required!"})
        }
        const newsubcategory = await Category.create({
            category,
            subCategory,
            description,
            tags
        })
        return res.status(200).json({status:true,message:"subcategory created successfully!",data:newsubcategory})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({status:false,message:"internal server error!!"})
    }
}



// get subcategory by id 
exports.getSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find subcategory by ID
        const subCategory = await Category.findById(id);
       
        // Check if subcategory exists
        if (!subCategory) {
            return res.status(404).json({ status: false, message: "Subcategory not found!" });
        }

        // Return subcategory data
        return res.status(200).json({ status: true, message: "Subcategory fetched successfully!", data: subCategory });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false, message: "Internal server error!" });
    }
};
