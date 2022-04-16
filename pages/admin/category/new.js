import { useState, useEffect, useRef} from 'react';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Sidebar from '../../../components/admin/Sidebar';
import axios from 'axios';
import TextField from '@mui/material/TextField';

export default function QuestionNew() {
  const [reactQuill, setReactQuill] = useState();

  const formInitial = {
    name: "",
    description: ""
  }
  const [ formData, setFormData ] = useState(formInitial);


  useEffect(() => {
    if (typeof window !== "undefined") {
      
      import("react-quill").then((mod) => {
        setReactQuill(mod);
      });
    }
  }, []);

  const nameChange = (event) =>{
    setFormData((prevData) => { return { ...prevData, name: event.target.value } })
  }

  const descriptionChange = (content, delta, source, editor) =>{
    if(editor.getText() !== ""){
      setFormData((prevData) => { return { ...prevData, description: content } })
    }else{
      setFormData((prevData) => { return { ...prevData, name: "" } })
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const flag = false;
 
    if (formData.name === ""){
      flag = true
      console.log("empty text")
    }

    if (formData.description === ""){
      flag = true
      console.log("empty description")
    } 


    if(flag){
      console.log("cannot submitted");

    }else{
      //let submitData = new FormData();
     
      axios.post('http://localhost:5000/api/category/create', formData).then(
        (res) => {
          console.log(res)
        }
      ).catch(
        (err) =>{
          console.log(err)
        }
      )
    }
  }

  if (reactQuill) {
    return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      className="table">
        <form onSubmit={handleSubmit}>
         <TextField
          required
          id="outlined-required"
          label="Name"
          onChange={nameChange}
          sx={{marginBottom: "20px"}}
        />

          <reactQuill.default
            theme='snow'
            onChange={descriptionChange}
            placeholder='Description...'
            style={{minHeight: '300px'}}
          />

          <input type="submit" value="submit"/>
        </form>
      </Box>
    </Box>
    )
  }else{
    return ""
  }
}
