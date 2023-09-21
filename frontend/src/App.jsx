
import {Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import BookDetails from "./pages/BookDetails"
import CreateBook from "./pages/CreateBook"
import EditBook from "./pages/EditBook"
import Profile from "./pages/Profile"
import { UserContextProvider } from "./context/UserContext"
import MyBooks from "./components/MyBooks"



const App = () => {
  return (
    
      <UserContextProvider>
      <Routes >
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/write" element={<CreateBook />} />
        <Route exact path="/books/book/:id" element={<BookDetails />} />
        <Route exact path="/edit/:id" element={<EditBook />} />
        <Route exact path="/mybooks/:id" element={<MyBooks/>} />
        <Route exact path="/profile/:id" element={<Profile />} />




      </Routes>
      
      
    </UserContextProvider>
  )
}

export default App