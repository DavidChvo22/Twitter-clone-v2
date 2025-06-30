import Home from "../Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";

export default function (){
   return (
     <Router>
       <Routes>
         <Route path="/" element={<Login></Login>}></Route>
         <Route path="/Home" element={<Home></Home>}></Route>
       </Routes>
     </Router>
   );
}