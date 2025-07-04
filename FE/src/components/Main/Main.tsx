import Home from "../Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register"

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/Home" element={<Home></Home>}></Route>
        <Route path="/Register" element={<Register></Register>}></Route>
      </Routes>
    </Router>
  );
}
