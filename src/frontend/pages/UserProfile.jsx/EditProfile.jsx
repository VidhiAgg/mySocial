import { AddAPhoto } from "@mui/icons-material";
import {Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import UserAvatar from "../../utility/UserAvatar";
import ProfileImageSelectorMapper from "./ProfileImageSelectorMapper";
import { AuthContext } from "../../context/AuthContext";
import { uploadImage } from "../../utility/UploadImage";
import { updateUseDetails } from "../../server/userServer";
import { PostContext } from "../../context/PostContext";

const EditProfile = ({open, closeModal }) => {

    const {postDispatch, users, userInfo} = useContext(PostContext);
    const {loginUser} = useContext(AuthContext);
  
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagesFromList, setProfileImageFromList] = useState(null);
    const [showProfileImagesOptions, setShowprofileImagesOptions] =
      useState(false);
    const [showEditPhotoModal, setShowEditPhotoModal] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

    const currentUser = users.find(user=> user.username === loginUser.user.username)
  const defaultState = {
    fullName: currentUser?.fullName || "",
    bio: currentUser?.bio || "",
    website: currentUser?.website || "",
    profilePhoto: currentUser?.profilePhoto || "",
  };

  const [profile, setProfile] = useState(defaultState);

  

  const reset = () => {
    setProfile(defaultState);
    setProfileImage(null);
    setProfileImageFromList(null);
};



const handleSubmtitButtonClick = async (e)=>{

  e.stopPropagation();
  e.preventDefault();
    if(profileImage){
        const getImageURL = await uploadImage(profileImage);
        // setProfile({...currentUser,...profile, profilePhoto: getImageURL})
        updateUseDetails(loginUser.token,{userData:
           { ...currentUser, ...profile, profilePhoto: getImageURL.url }}, postDispatch, users, userInfo);
    }
    else if(profileImagesFromList){
       // setProfile({...currentUser,...profile, profilePhoto: profileImagesFromList})
        updateUseDetails(loginUser.token,{userData: { ...currentUser, ...profile, profilePhoto: profileImagesFromList }}, postDispatch, users, userInfo);
    }else{
        // setProfile({...currentUser,...profile});
        updateUseDetails(loginUser.token,{
            userData: { ...currentUser, ...profile }}, postDispatch, users, userInfo);
    }
    setShowEditPhotoModal(false);
    closeModal(false);
}
  const handleClose = (e) => {
    e.stopPropagation();

    closeModal(false);
  };
  const clearFields = () =>
    {
        setProfileImage(null);
    setProfileImageFromList(null);
        setProfile({
        fullName: "",
      bio: "",
      website: "",
    })};

  const handleImageChange = (e) => {
    e.stopPropagation();
    const image = e.target.files[0];
    // const imageURL = URL.createObjectURL(image);
    // setProfile({ ...profile, profilePhoto: imageURL });
     setProfileImage(image);
    setShowEditPhotoModal(false);
  };

const handleInputChange =(event)=>{
    event.stopPropagation();
    setShowSubmitButton(true);
    setProfile({...profile,[event.target.name]: event.target.value})
}

  return (
    // <div className='edit-profile-modal'>

    <div>
    {
        currentUser?.username === loginUser.user.username && 
        <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <button onClick={reset}>Reset</button>
          <button onClick={clearFields}>Clear</button>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogActions>
  
        <DialogContent>
          <form onSubmit={handleSubmtitButtonClick}>
            <div
              className="profile-pic"
              onClick={(e) => {
                e.stopPropagation();
                setShowEditPhotoModal(false);
              }}
            >
              <div className="profile-icon-display">
                <UserAvatar
                  userProp={
                    profileImage
                      ? {
                          ...currentUser,
                          profilePhoto: 
                          URL.createObjectURL(profileImage),
                        }
                      : profileImagesFromList
                      ? {
                          ...currentUser,
                          profilePhoto: profileImagesFromList,
                        }
                      : currentUser
                  }
                />
  
                <div
                  className="edit-profile-pic-container"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditPhotoModal((prev) => !prev);
                  }}
                >
                  <AddAPhoto className="edit-profile-icon" />
                </div>
              </div>
  
              <div className="edit-profile-modal">
                {showEditPhotoModal && (
                  <div
                    className="upload-image-option"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="upload-image">
                      <label
                        htmlFor="upload-profile-image"
                        onClick={(e) => e.stopPropagation(e)}
                      >
                        Upload Image
                      </label>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        name=""
                        id="upload-profile-image"
                        onChange={handleImageChange}
                      />
                    </div>
                    <div
                      className="select-image"
                      onClick={(e) => {
                        e.stopPropagation(e);
                       
                        setShowprofileImagesOptions((prev) => !prev);
                       
                      }}
                    >
                      Select Avtaar
                    </div>
  
                    {showProfileImagesOptions &&
                    <div className="profile-image-selector-modal">
                          <ProfileImageSelectorMapper 
                          setShowEditPhotoModal={setShowEditPhotoModal}
                          setProfileImageFromList={setProfileImageFromList}
                          setShowprofileImagesOptions={setShowprofileImagesOptions}
                          user={profile}
                          />
                    </div>
                     }
                  </div>
                )}
              </div>
  
              
           
            </div>
            <div className="profile-details">
              <label htmlFor="name-field">
                <input
                  type="text"
                  value={profile.fullName}
                  name="fullName"
                  id="name-field"
                  placeholder="FullName"
                  onChange={(event)=>handleInputChange(event)}
                />
              </label>
  
              <label htmlFor="bio-field">
                <input
                  type="text"
                  value={profile.bio}
                  name="bio"
                  id="bio-field"
                  placeholder="Tell us about you"
                  onChange={(event)=>handleInputChange(event)}
                />
              </label>
  
              <label htmlFor="">
                <input
                  type="text"
                  value={profile.website}
                  name="website"
                  id=""
                  placeholder="Your portfolio"
                  onChange={(event)=>handleInputChange(event)}
                />
              </label>
            </div>
            <div>
              <button  type="submit">Submit</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    }
   </div>
  );

};

export default EditProfile;
