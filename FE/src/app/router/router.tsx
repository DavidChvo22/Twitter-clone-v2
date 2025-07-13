import Home from "../../home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../login/login";
import Register from "../../register/register"

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
