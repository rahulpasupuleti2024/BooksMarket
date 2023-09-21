import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Review from "../components/Review"
import { useNavigate,useParams } from "react-router-dom"
import axios from "axios"
import { useContext,useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"
import { URL,IF } from "../url"


const BookDetails = () => {
  const bookId = useParams().id
  
  const [book, setBook] = useState({})
  const { user } = useContext(UserContext)
   const [reviews,setReviews]=useState([])
  const [review,setReview]=useState("")
  const [loader, setLoader] = useState(false)
   const navigate=useNavigate()
  

  const fetchBook = async () => {
    setLoader(true)
    try{
      const res= await axios.get(URL+"/api/books/"+bookId)
      // console.log(res.data)
      setBook(res.data)
      setLoader(false)
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }
   const handleDeleteBook=async ()=>{

    try{
      const res=await axios.delete(URL+"/api/books/"+bookId,{withCredentials:true})
      console.log(res.data)
      navigate("/")

    }
    catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    fetchBook()

  }, [bookId])
  
   const fetchBookReviews=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/reviews/review/"+bookId)
      setReviews(res.data)
      setLoader(false)

    }
    catch(err){
      setLoader(true)
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchBookReviews()

  },[bookId])

  const bookReview=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(URL+"/api/reviews/create",
      {review:review,author:user.username,bookId:bookId,userId:user._id},
      {withCredentials:true})
      
      // fetchPostComments()
      // setComment("")
      window.location.reload(true)

    }
    catch(err){
         console.log(err)
    }

  }


  return (
    <div>
    <Navbar/>
        {loader?<div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>:<div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">{book.title}</h1>
          <h2 className="text-2xl font-bold text-black md:text-3xl">Author: <span>{book.authorname}</span></h2>
          {user?._id===book.userId && <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer" onClick={()=>navigate("/edit/"+bookId)}><BiEdit/></p>
            <p className="cursor-pointer" onClick={handleDeleteBook}><MdDelete/></p>
         </div>}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{ book.username}</p>
       <div className="flex space-x-2">
       <p>12/09/23</p>
       <p>1:40</p>
       </div>
        </div>
        <img src={IF+book.photo} alt="" className="  h-full w-80 object-cover" />
        <p className="mx-auto mt-8">{book.desc }</p>
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <button className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add to cart</button>
          </div>
         <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            {book.categories?.map((c,i)=>(
            <>
            <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
            </>
            
          ))}
          </div>
         </div>
         <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Reviews:</h3>
          {reviews?.map((c)=>(
          <Review key={c._id} c={c} book={book} />
         ))}
         
           
         
        
        </div>
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input  onChange={(e)=>setReview(e.target.value)} type="text" placeholder="Write a review" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"/>
          <button onClick={bookReview}  className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Review</button>
        </div>
        
        </div>}
        <Footer/>
    </div>
  )
}

export default BookDetails