import Footer from "../components/Footer"
import HomeBooks from "../components/HomeBooks"
import Navbar from "../components/Navbar"
 import axios from "axios"
 import { URL } from "../url"
import { useContext,useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
 import { UserContext } from "../context/UserContext"




const Home = () => {
  const { search } = useLocation()
  //console.log(search)

  const [books, setBooks] = useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader, setLoader] = useState(false)
  const { user } = useContext(UserContext)
  //console.log(user)



   const fetchBooks=async()=>{
  setLoader(true)
    try{
       const res=await axios.get(URL+"/api/books/"+search)
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
     <>
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
    </>
  )
}

export default Home