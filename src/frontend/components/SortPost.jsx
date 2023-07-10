import React, { useContext, useState } from 'react'
import { PostContext } from '../context/PostContext';
import './sortPost.css'
import {Button, Dialog, DialogTitle, DialogContent, DialogActions} 
from '@mui/material'
import { ExpandLess, ExpandMore, TrendingUp, Tune } from '@mui/icons-material';
import { projectConstants } from '../utility/MySocialUtil';

const SortPost = () => {
    const {activeSortType,setactiveSortType} = useContext(PostContext);
    const[showModal, setShowModal] = useState(false);
  return (
    <div className='sort-panel'>
        <div className="feed-header">
            <h3>{activeSortType} Post</h3>

        </div>
        <div className="sort-btn">
            <button onClick={()=> setShowModal((prev)=> !prev)}>
               <Tune />
            </button>

            {/* <Dialog open={showModal} onClose={handleCloseClick}>
                <DialogTitle>Sort By</DialogTitle>
                <DialogContent>

                </DialogContent>
            </Dialog> */}
            {
                showModal && (
                <div className="sort-modal">
                    <button className='txt-btn' style={{color: activeSortType === projectConstants.sortByTrending ? "var(--text-highlight)" : ""}}
                    onClick={()=>setactiveSortType(projectConstants.sortByTrending)}>
                        <TrendingUp/> Trending
                    </button>

                    <button className='txt-btn' style={{color: activeSortType === projectConstants.sortByLates ? "var(--text-highlight)" : ""}}
                    onClick={()=>setactiveSortType(projectConstants.sortByLates)}>
                        <ExpandLess/> Latest
                    </button>


                    <button className='txt-btn' style={{color: activeSortType === projectConstants.sortByOldest ? "var(--text-highlight)" : ""}}
                    onClick={()=>setactiveSortType(projectConstants.sortByOldest)}>
                        <ExpandMore/> Oldest
                    </button>
                    
                </div>
            )
                }

            
        </div>
        
    </div>
  )
}

export default SortPost