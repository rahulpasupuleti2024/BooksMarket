import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import HomeBooks from "../components/HomeBooks"
import Loader from "../components/Loader"

const MyBooks = () => {
    const {search}=useLocation()
  // console.log(search)
  const [books,setBooks]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  // console.log(user)

  const fetchBooks=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/books/user/"+user._id)
      // console.log(res.data)
      setBooks(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
fetchBooks()

  },[search])
  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        books.map((book)=>(
          <>
          <Link to={user?`/books/book/${book._id}`:"/login"}>
          <HomeBooks key={book._id} book={book}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No books available</h3>}
        </div>
        <Footer/>
    </div>
  )
}

export default MyBooks