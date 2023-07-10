import React from 'react'
import "./UserAvatar.css"
const UserAvatar = ({userProp}) => {
    const avatar = userProp?.profilePhoto;
    const userIntials = (name)=>{
        const splitName = name.split(" ");
        const getIntials = splitName.reduce((acc,curr, index)=>
            index === 0 || index === splitName.length-1  ? 
            acc += curr.charAt(0).toUpperCase() :acc
        , "")

        return getIntials;
    }
  return (
    <span className='user-avatar'>
        {
            avatar ? (
                <img className='defaultAvatar' src={avatar} alt={userProp?.fullName} />
            ):
            <span className='defaultAvatar'>
                {
                    userIntials(userProp?.fullName)
                }
            </span>
        }
    </span>
  )
}

export default UserAvatar