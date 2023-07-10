import { Close } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../../utility/UserAvatar';

const FollowUnFollow = ({followModel, setFollowModel}) => {
const {title, list} = followModel;
const navigate = useNavigate();
  return (
    <div className="mainContainer">
        <div className="header">
            <h2>{title}</h2>
            <button onClick={(e)=>{
                setFollowModel(false);
            }}>
                <Close />
            </button>
        </div>
        <div className="list">
            {
                list.length > 0 ? (
                    list.map(data => (
                        <div className="list-card" key = {data._id} onClick={(e)=>{
                            // e.stopPropagation();
                            setFollowModel(false);
                            navigate(`/profile/${data.username}`)
                        }}>
                            <div className="profile-icon-display">
                            <UserAvatar userProp={data}/>
                            </div>
                            <div className="user-details">
                                <div className="name">
                               <h3>     {data.fullName}</h3>
                                </div>
                                <div className="username">
                                    <p>@{data.username}</p>
                                </div>
                            </div>
                        </div>
                    ))

                    
                ) :
                (<div>
                <p>Oops! No {title}found</p>
                </div>)
            }
        </div>
    </div>
  )
}

export default FollowUnFollow