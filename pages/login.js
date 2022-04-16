import { useState, useEffect, useRef} from 'react';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Header from '../components/admin/Header';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { padding, width } from '@mui/system';
import { useRouter } from 'next/router';

export default function Signup() {
  const formInitial = {
    email: "",
    password: "",
  }

  const router = useRouter();

  const [formData, setFormData ] = useState(formInitial);
  const [pageError, setPageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailChange = (event) =>{
    setFormData((prevData) => { return { ...prevData, email: event.target.value } })
  }

  const passwordChange = (event) =>{
    setFormData((prevData) => { return { ...prevData, password: event.target.value } })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const flag = false;

    if (formData.email === ""){
      flag = true
      console.log("empty email")
    }

    if (formData.password === ""){
      flag = true
      console.log("empty password")
    }
    
    console.log(formData)

    if(flag){
      console.log("cannot submitted");

    }else{
      setLoading(true)
      axios.post('http://localhost:5000/api/user/login', formData).then(
        (res) => {
          console.log(res)
          if(res.data.success == 1){
            sessionStorage.setItem("user", JSON.stringify(res.data.user))
            setLoading(false);
            router.push('user/dashboard');

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

        <Button type="submit" variant='contained'>login</Button>   
        </form>
      </Box>
    </Box>
    </>
    )

}
