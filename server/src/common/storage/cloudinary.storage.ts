import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
cloudinary.config({
    cloud_name:"dzbytteef",
    api_key:"287217626513136",
    api_secret:"BCjHZt9N7VErmYkM5gqNRyV39Sw"
})
export const storageCloudinary = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:()=>({
        folder:'dailoc'
    })
})