
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./components/Home";
import Employee from "./components/Employee";
import Profile from "./components/Profile";
import Category from "./components/Category";
import AddCategory from "./components/AddCategory";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import { Outlet } from "react-router-dom";
function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
       <Route path="/dashboard" element={<Dashboard/>}>
       <Route index element={<Home />}></Route>
       <Route path="employee" element={<Employee />}></Route>
       <Route path="category" element={<Category />}></Route>
       <Route path="profile" element={<Profile />}></Route>
       <Route path="add_category" element={<AddCategory />}></Route>
        <Route path="add_employee" element={<AddEmployee />}></Route>
        <Route path="edit_employee/:id" element={<EditEmployee />}></Route>
       </Route>

      </Routes>
      </BrowserRouter>
   
  );
}

export default App

