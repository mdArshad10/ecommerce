import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_NAME , 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const fileUploading = async (localfilePath)=>{
    try {
        if(!localfilePath) return null
       const resp = await cloudinary.uploader.upload(localfilePath,{resource_type:"auto"})
       console.log(`the file is upload with the name of ${resp.original_filename}`.bgMagenta);
       fs.unlinkSync(localfilePath) // unlike the file after the complete file uploading
       return resp
    } catch (error) {
        fs.unlinkSync(localfilePath)
        return null
    }
}

const fileUpdate = async(localfilePath, publicId)=>{
    try {
        if(!localfilePath) return null
        // destroy the file
        await cloudinary.uploader.destroy(publicId)

        // new upload
        const resp = await cloudinary.uploader.upload(localfilePath,{resource_type:"auto"})

       console.log(`the file is upload with the name of ${resp.original_filename}`.bgMagenta);
       fs.unlinkSync(localfilePath) // unlike the file after the complete file uploading
       return resp
    } catch (error) {
        fs.unlinkSync(localfilePath)
        return null
    }
}

export {fileUploading, fileUpdate }









