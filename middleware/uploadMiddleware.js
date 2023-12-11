const cloudinary = require('cloudinary').v2;

// cloudinary config
cloudinary.config({ 
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadFileToCloudinary(file) {
    const cloudinaryUploadResult = await cloudinary.uploader.upload(file.buffer, {
        folder: 'users',
        allowedFormats: [file.type],
    });

    return cloudinaryUploadResult.url;
}

async function handleProfilePictureUpload(req, res) {
    const profilePicture = req.file('profilePicture');

    if (!profilePicture) {
        return null;
    }

    const profilePictureUrl = await uploadFileToCloudinary(profilePicture);
    return profilePictureUrl;
}

async function handleResumeUpload(req, res) {
    const resume = req.file('resume');

    if (!resume) {
        return null;
    }

    const resumeUrl = await uploadFileToCloudinary(resume);
    return resumeUrl;
}


module.exports = { handleProfilePictureUpload, handleResumeUpload };