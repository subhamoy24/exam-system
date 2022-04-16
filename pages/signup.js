import { useState, useEffect, useRef} from 'react';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Header from '../components/admin/Header';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { padding, width } from '@mui/system';

export default function Signup() {
  const formInitial = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: ""
  }

  const [formData, setFormData ] = useState(formInitial);
  const [pageError, setPageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const  firstNameChange = (event) =>{
    setFormData((prevData) => { return { ...prevData, firstName: event.target.value } })
  }
  const lastNameChange = (event) =>{
    setFormData((prevData) => { return { ...prevData, lastName: event.target.value } })
  }
  const emailChange = (event) =>{
    setFormData((prevData) => { return { ...prevData, email: event.target.value } })
  }

  const passwordChange = (event) =>{
    setFormData((prevData) => { return { ...prevData, password: event.target.value } })
  }

  const retypePasswordChange = (event) =>{
    setFormData((prevData) => { return { ...prevData, retypePassword: event.target.value } })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const flag = false;
 
    if (formData.firstName === ""){
      flag = true
      console.log("empty text")
    }

    if (formData.lastName === ""){
      flag = true
      console.log("empty lastName")
    } 

    if (formData.email === ""){
      flag = true
      console.log("empty email")
    }

    if (formData.password === ""){
      flag = true
      console.log("empty password")
    }
    
    if (formData.retypePassword === ""){
      flag = true
      console.log("empty Retype password")
    }

    if (formData.password !== formData.retypePassword){
      flag = true
      console.log("retype password should be matched")
    }

    console.log(formData)

    if(flag){
      console.log("cannot submitted");

    }else{
      setLoading(true)
      axios.post('http://localhost:5000/api/user/signup', formData).then(
        (res) => {
          console.log(res)
          if(res.success == 1){
            setLoading(false);
          }else{
            setPageError(true)
            setLoading(false);
          }
        }
      ).catch(
        (err) =>{
          setPageError(true)
          setLoading(false);
          console.log(err)
        }
      )
    }
  }

    return (
    <>
    <Header/>
    <Box sx={{ display: 'flex', flexDirection: "column"}}>
     { loading ? <LinearProgress sx={{ marginTop: "64px", height: "7px"}}/> : ""}
     { pageError ? <h1> There is some error </h1> : ""}
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", justifyContent: "center", bgcolor: 'background.default', p: 3 }}
        className="table">
        <form  onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "30%"}}>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          onChange={firstNameChange}
          sx={{marginBottom: "20px"}}
        />
        
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          onChange={lastNameChange}
          sx={{marginBottom: "20px"}}
        />

        <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={emailChange}
          sx={{marginBottom: "20px"}}
        />
        
        <TextField
          required
          id="outlined-required"
          label="password"
          onChange={passwordChange}
          sx={{marginBottom: "20px"}}
        />
        <TextField
          required
          id="outlined-required"
          label="retype password"
          onChange={retypePasswordChange}
          sx={{marginBottom: "20px"}}
        />

        <Button type="submit" variant='contained'>login</Button>   
        </form>
      </Box>
    </Box>
    </>
    )

}
