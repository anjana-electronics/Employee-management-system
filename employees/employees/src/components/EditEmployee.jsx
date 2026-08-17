import React from 'react'
import {useParams} from 'react-router-dom'
import  { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const EditEmployee=()=>{
const {id}=useParams()
0
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
   
    address: "",
    salary: "",
    category_id: "",
    
  }); 
  const[category,setCategory]=useState([])
   const navigate=useNavigate()
  useEffect(()=>{
       axios.get("http://localhost:3000/auth/category")
       .then(result=>{
       if(result.data.Status){
         setCategory(result.data.Result);
;
       }else{
         alert(result.data.Error)
       }

       }).catch(err=>console.log(err))
       axios.get('http://localhost:3000/auth/employee/'+id)
       .then(result=>{
         setEmployee({
          ...employee,
          name:result.data.Result[0].name,
          email:result.data.Result[0].email,
          address:result.data.Result[0].address,
          salary:result.data.Result[0].salary,
          cztegory_id:result.data.Result[0].category_id,
         })
       }).catch(err=>console.log(err))
    },[]);
const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/auth/edit_employee/'+id,employee)
        .then(result=>{
        if(result.data.Status){
                navigate('/dashboard/employee')
            }else{
                alert(result.data.Error)
            }
        }).catch(err=>console.log(err))
        console.log(employee);
    };
    
return(

<div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-align-center">Edit Employee </h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Name"
              value={employee.name}
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              placeholder="Enter Email"
              value={employee.email}
              id="inputEmail4"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Address"
               value={employee.address}
              id="inputAddress"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Salary"
               value={employee.salary}
              id="inputSalary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          

        

          <div className="col-12">
            <label htmlFor="category">Category</label>
           <select
  name="category"
  id="category"
  className="form-select"
  onChange={(e) =>
    setEmployee({
      ...employee,
      category_id: e.target.value
    })
  }
>
  <option value="">Select Category</option>

  {category.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>

)


}

export default EditEmployee;