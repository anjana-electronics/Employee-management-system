import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import multer  from 'multer'
import path from 'path'
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/adminlogin", (req, resp) => {
  console.log("Request received");
  console.log(req.body);
  const sql = "SELECT * from admin where email=? and password=?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.log(err);
      return resp.json({ loginStatus: false, Error: "Query Error" });
    }
    console.log(result);

    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" },
      );
      resp.cookie("token", token);

      return resp.json({ loginStatus: true });
    } else {
      return resp.json({
        loginStatus: false,
        Error: "wrong email or password",
      });
    }
  });
});
router.get("/category", (req, resp) => {
  const sql = "SELECT *FROM category";
  con.query(sql, (err, result) => {
    
    if (err) {
      return resp.jscon({ Status: false, Error: "Query Error" });
    }
    return resp.json({ Status: true, Result: result });
  });
});

router.post("/add_category", (req, resp) => {
  const sql = "INSERT INTO category(`name`)VALUES(?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) {
      return resp.json({ Status: false, Error: "Query Error" });
    }
    return resp.json({ Status: true });
  });
});

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/images')
  },
  filename: (req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage
})

router.post("/add_employee", upload.single('image'),(req, resp) => {
  const sql = `INSERT INTO employee 
   (name,email,password,address,salary,image,category_id)  VALUES(?)`;
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return resp.json({ Status: false, Error: "Query Error" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.category_id,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) {
        return resp.json({ Status: false, Error: err.message });
      }
      return resp.json({ Status: true });
    });
  });
});


router.get("/employee", (req, resp) => {
  const sql = "SELECT *FROM employee";
  con.query(sql, (err, result) => {
    
    if (err) {
      return resp.jscon({ Status: false, Error: "Query Error" });
    }
    return resp.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id",(req,resp)=>{
  const id=req.params.id;
  const sql = "SELECT *FROM employee where id=?";
  con.query(sql, [id],(err, result) => {
    
    if (err) {
      return resp.json({ Status: false, Error: "Query Error" });
    }
    return resp.json({ Status: true, Result: result });
  });
})
router.put("/edit_employee/:id",(req,resp)=>{
  const id=req.params.id;

  const sql = `UPDATE employee set name=?,email=?,salary=?,address=?,category_id=? 
  WHERE id=?`;
  const values = [
      req.body.name,
      req.body.email,
      req.body.salary,
      req.body.address,
      
      
      req.body.category_id,
    ];
  con.query(sql,[...values,id] ,(err, result) => {
    
    if (err) {
      return resp.jscon({ Status: false, Error: "Query Error"+err });
    }
    return resp.json({ Status: true, Result: result });
  });
})

router.delete("/delete_employee/:id",(req,resp)=>{
  const id=req.params.id;
  const sql="delete from employee where id=?"
  con.query(sql,[id] ,(err, result) => {
    
    if (err) {
      return resp.jscon({ Status: false, Error: "Query Error"+err });
    }
    return resp.json({ Status: true, Result: result });
  });
})
router.get('/admin_count',(req,resp)=>{
  const sql="select count(id) as admin from admin";
   con.query(sql ,(err, result) => {
    
    if (err) {
      return resp.jscon({ Status: false, Error: "Query Error"+err });
    }
    return resp.json({ Status: true, Result: result });
  });
})


router.get('/employee_count',(req,resp)=>{
  const sql="select count(id) as employee from employee";
   con.query(sql ,(err, result) => {
    
    if (err) {
      return resp.jscon({ Status: false, Error: "Query Error"+err });
    }
    return resp.json({ Status: true, Result: result });
  });
})


router.get('/salary_count',(req,resp)=>{
  const sql="select sum(salary) as salary from employee";
   con.query(sql ,(err, result) => {
    
    if (err) {
      return resp.jscon({ Status: false, Error: "Query Error"+err });
    }
    return resp.json({ Status: true, Result: result });
  });
})

router.get("/admin_records",(req,resp)=>{
const sql="select *from admin"
con.query(sql ,(err, result) => {
    
    if (err) {
      return resp.jscon({ Status: false, Error: "Query Error"+err });
    }
    return resp.json({ Status: true, Result: result });
  });

})

router.get('/logout',(req,resp)=>{
  resp.clearCookie('token')
  return resp.json({Status:true})
})
export { router as adminRouter };
