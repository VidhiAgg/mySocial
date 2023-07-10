import { toast } from "react-toastify";

   // const formData = new FormData();
    // console.log(image);
    // formData.append("file", image);
    
    // formData.append("upload_preset", "my_social");

    // formData.append("folder", "my_social");
    // const response = await axios.post
    // ("https://api.cloudinary.com/v1_1/dql9gatsf/image/upload"
    // , {formData});
    // console.log(response);
    // return response;




export const uploadImage = async (image)=>{
  try 
  {

    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "mySocial");
    formData.append("folder", "mySocial");
    console.log(formData);
    const res = await fetch(
      
      "https://api.cloudinary.com/v1_1/dql9gatsf/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const jsonRes = await res.json();
    console.log(jsonRes);
    return jsonRes
  } catch (error) {
    console.error(error);
    toast.error("Faile to upload ")
  }
}