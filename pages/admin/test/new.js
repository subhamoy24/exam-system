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
    duration: "",
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
    setFormData((prevData) => { return { ...prevData, name: event.target.value }})
  }

  const durationChange = event =>{
    const duration = event.target.value;
    setFormData((prevData) => { return { ...prevData, duration: duration ? parseInt(duration) : "" }})
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

    if(formData.duration == ""){
      flag = true
      console,log("empty duartion");
    }


    if(flag){
      console.log("cannot submitted");

    }else{
      //let submitData = new FormData();
     
      axios.post('http://localhost:5000/api/test/create', formData).then(
        (res) => {
          console.log(res)
          window.location.reload();
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
          <div>
          <TextField
            required
            id="outlined-required"
            label="Name"
            onChange={nameChange}
            value={formData.name}
            sx={{marginBottom: "20px"}}
          />
          </div>

          <div>       
          <TextField
            required
            id="outlined-required"
            label="Duration"
            onChange={durationChange}
            value={formData.duration}
            sx={{marginBottom: "20px"}}
          />
          </div>

          <reactQuill.default
            theme='snow'
            onChange={descriptionChange}
            value={formData.description}
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
