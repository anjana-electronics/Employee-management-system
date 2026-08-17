import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: "",
    category_id: "",
    image: "",
  });

  const [category, setCategory] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData=new FormData();
    formData.append('name',employee.name);
    formData.append('email',employee.email);
    formData.append('password',employee.password);
    formData.append('address',employee.address);
    formData.append('salary',employee.salary);
    formData.append('image',employee.image);
    formData.append('category_id',employee.category_id);

    axios.post('http://localhost:3000/auth/add_employee',formData)

    .then(result=>{
      if(result.data.Status){
                navigate('/dashboard/employee')
            }else{
                alert(result.data.Error)
            }
    })
    .catch(err=>console.log(err))
    console.log(employee);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-align-center">Add Employee </h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Name"
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
              id="inputEmail4"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              placeholder="Enter Password"
              id="inputPassword4"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
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
              id="inputSalary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          

          <div className="col-12">
            <label htmlFor="inputGroupFile01" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e)=>setEmployee({...employee,image:e.target.files[0]})}
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
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
