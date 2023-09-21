/* eslint-disable react/prop-types */
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"

const Review = ({ c, book }) => {
  
  const {user}=useContext(UserContext)
  const deleteReview=async(id)=>{
    try{
      await axios.delete(URL+"/api/reviews/"+id,{withCredentials:true})
      window.location.reload(true)
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
          <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">{c.author}</h3>
            <div className="flex justify-center items-center space-x-4">
              <p className="text-gray-500 text-sm">12/09/23</p>
          <p className="text-gray-500 text-sm">1:40</p>
          {user?._id===c?.userId ?
                <div className="flex items-center justify-center space-x-2">
            
            <p className="cursor-pointer" onClick={()=>deleteReview(c._id)}><MdDelete/></p>
         </div>:""}
            </div>
            </div>
      <p className="px-4 mt-2">{c.review }</p>
            </div>
  )
}

export default Review