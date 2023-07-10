import React, { useContext,useState } from 'react'
import './navigation.css'
import { PostContext } from '../context/PostContext'
import SearchModal from './SearchModal';
import { projectConstants } from '../utility/MySocialUtil';
const Navigation = () => {
  const {postDispatch,searchUserInput} = useContext(PostContext);
  const[showSearchMoal, setSearchModal] = useState(false);
  const handleSearch = (event)=>{
    event.target.value.length === 0 ? setSearchModal(false) : setSearchModal(true)
    postDispatch({type:projectConstants._ADD_SEARCH_INPUT_, payload:event.target.value})


  }
  return (
    <div className='nav-container'>
        <div className="nav-header">
            <h1>My Social</h1>
        </div>
        <div className="search-bar">
            <input type='text' placeholder="Search User"
            value={searchUserInput} onChange={handleSearch} />

            {
              showSearchMoal && <SearchModal setSearchModal={setSearchModal}/>
            }
        </div>

       
        <div className="toggle-theme">
            {/* <button>Dark theme</button> */}
        </div>
    </div>
  )
}

export default Navigation