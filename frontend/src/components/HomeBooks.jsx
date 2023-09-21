/* eslint-disable react/prop-types */
import { IF } from "../url"

const HomeBooks = ({book}) => {
  return (
    <div className="w-full flex mt-8 space-x-4">
    {/* left */}
    <div className="w-[35%] h-[200px] flex justify-center items-center">
    <img src={IF+book.photo} alt="" className="  h-full w-70 object-cover"/>
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
      {book.title}
        </h1>
         <h2 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          Author :<span>{ book.authorname}</span>
        </h2>
        
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>{book.username}</p>
       <div className="flex space-x-2 text-sm">
       <p>{new Date(book.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(book.updatedAt).toString().slice(16,24)}</p>
       </div>
      </div>
        <p className="text-sm md:text-lg">{book.desc}</p>
    </div>

    </div>
  )
}

export default HomeBooks