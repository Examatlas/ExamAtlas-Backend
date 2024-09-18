const CurrentAffair = require('../Models/CurrentAffair');

exports.createCurrentAffair = async (req, res) => {
    try {
        const { title, keyword, content, tags } = req.body;

        const formattedTags = Array.isArray(tags) ? tags : tags ? tags.split(',') : [];

        // Create new current affair
        const newCA = new CurrentAffair({
            title,
            keyword,
            content,
            tags: formattedTags,
        });

        await newCA.save();

        res.status(201).json({ status:true, message: 'Current affair created successfully', currentAffair: newCA });
    } catch (error) {
        console.error('Error creating current affair:', error);
        res.status(500).json({status:false, message: 'Server error', error });
    }
};



// update by id 
exports.updateCurrentAffair = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, keyword, content, tags } = req.body;

        // Format tags if necessary
        const formattedTags = Array.isArray(tags) ? tags : tags ? tags.split(',') : [];

        // Find the current affair by ID and update
        const updatedCA = await CurrentAffair.findByIdAndUpdate(
            id,
            { title, keyword, content, tags: formattedTags },
            { new: true, runValidators: true }  // Returns the updated document
        );

        if (!updatedCA) {
            return res.status(404).json({ message: 'Current affair not found' });
        }

        res.status(200).json({ status:true,message: 'Current affair updated successfully', currentAffair: updatedCA });
    } catch (error) {
        console.error('Error updating current affair:', error);
        res.status(500).json({status:false, message: 'Server error', error });
    }
};



// get all currentaffair
exports.getAllCurrentAffairs = async (req, res) => {
    try {
        const currentAffairs = await CurrentAffair.find().sort({ createdAt: -1 });

        if (currentAffairs.length === 0) {
            return res.status(404).json({ message: 'No current affairs found' });
        }

        res.status(200).json({status:true, message: 'Current affairs retrieved successfully', currentAffairs });
    } catch (error) {
        console.error('Error retrieving current affairs:', error);
        res.status(500).json({status:false, message: 'Server error', error });
    }
};



// get by id 
exports.getCurrentAffairById = async (req, res) => {
    try {
        const { id } = req.params;
        const currentAffair = await CurrentAffair.findById(id);

        if (!currentAffair) {
            return res.status(404).json({ message: 'Current affair not found' });
        }

        res.status(200).json({ status:true, message: 'Current affair retrieved successfully', currentAffair });
    } catch (error) {
        console.error('Error retrieving current affair:', error);
        res.status(500).json({status:false, message: 'Server error', error });
    }
};



// delete by id
exports.deleteCurrentAffair = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCA = await CurrentAffair.findByIdAndDelete(id);

        if (!deletedCA) {
            return res.status(404).json({ message: 'Current affair not found' });
        }

        res.status(200).json({status:true, message: 'Current affair deleted successfully', currentAffair: deletedCA });
    } catch (error) {
        console.error('Error deleting current affair:', error);
        res.status(500).json({status:false, message: 'Server error', error });
    }
};



