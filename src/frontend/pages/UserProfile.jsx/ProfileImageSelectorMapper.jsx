import React from 'react'
import { ProjectImages } from '../../utility/ProjectImages'
import { Close } from '@mui/icons-material'

const ProfileImageSelectorMapper = ({setShowEditPhotoModal, setProfileImageFromList,
    setShowprofileImagesOptions, user
}) => {

    const closeModal = () =>{
        setShowEditPhotoModal(false)
        setShowprofileImagesOptions(false);
    }

    const handleImageClick = (e,imageUrl)=>{
        e.stopPropagation();
        setProfileImageFromList(imageUrl);
        setShowprofileImagesOptions(false)
        setShowEditPhotoModal(false);
    }

  return (
    <div className='profile-images-selector'>
<div className="header-container" onClick={(e)=> e.stopPropagation()}>
    <h4>Select Avtaar</h4>
    <button onClick={closeModal}>
        <Close />
    </button>
</div>
{
    ProjectImages.map(image => 
        <img style={{borderRadius:"50%", width:"150px", 
        border:"1px solid black", margin: "10px"}} 
        src={image} alt={image} key={image}
        
        className='profile-image-option'
        onClick={(e)=>handleImageClick(e,image)}
        />
    )
}

    </div>
  )
}

export default ProfileImageSelectorMapper