
import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from "react-router-dom";

const AddCategory=()=>{
     const navigate=useNavigate()
    const [category,setCategory]=useState()
    const handleSubmit=(e)=>{
        e.preventDefault()
       
        axios.post('http://localhost:3000/auth/add_category',{ category })
        .then(result=>{
            if(result.data.Status){
                navigate('/dashboard/category')
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err=>console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border'>
            
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="category" ><strong>Category:</strong></label>
                    <input type="text" name='category'  placeholder='Enter Category'
                     onChange={(e)=> setCategory( e.target.value)}  className='form-control rounded-0'/>
                </div>
                
                 <button className='btn btn-success w-100 rounded-0 mb-3' type="submit">Add Category</button>
                
              
    
            </form>
        </div>
    </div>
    );
}


export default AddCategory;