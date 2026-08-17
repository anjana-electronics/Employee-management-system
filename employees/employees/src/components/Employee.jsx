import React from "react";


import axios from "axios";

import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete=(id)=>{
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result=>{
      if(result.data.Status){
        window.GeolocationPosition.reload()
      }
      else{
        alert(result.data.Error)
      }
    })
  }
  return (
    <div className="px-5 mt-3 ">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>

                <td>{c.email}</td>
                <td>{c.address}</td>
                <td>{c.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${c.id}`}
                    className="btn btn-info btn-sm me-4"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={()=>handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
