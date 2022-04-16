import { useState, useEffect, useRef} from 'react';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Sidebar from '../../../../components/admin/Sidebar';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useRouter } from 'next/router';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function QuestionEdit() {
  const [reactQuill, setReactQuill] = useState();
  const [catList, setCatList] = useState([]);
  const [ formData, setFormData ] = useState(null);

  let router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if(router.isReady) {
      if (typeof window !== "undefined") {
        import("react-quill").then((mod) => {
          setReactQuill(mod);
        });
      }

      axios.get(`http://localhost:5000/api/question/get/${id}`).then(
        (res) => {
          console.log(formData);
          setFormData(res.data);
        }
      )

      axios.get(`http://localhost:5000/api/category`).then(
        (res) => {
          setCatList(res.data);
        }
      )
    }
  }, [router.isReady]);

  const questionChange = (content, delta, source, editor) =>{
    if(editor.getText() !== ""){
      setFormData((prevState) => { return{...prevState, question: content}})
    }else{
      setFormData((prevState) => { return{...prevState, question: ""}})
    }
  }

  const handleCatChange = (event) => {
    setFormData((prevState) => { return { ...prevState, categoryId: event.target.value}})
  }

  const answerChange = (content, delta, source, editor) =>{
    if(editor.getText() !== ""){
      setFormData((prevState) => { return{...prevState, explanation: content}})
    }else{
      setFormData((prevState) => { return{...prevState, explanation: content}})
    }
  }

  const handleRadio = (e) =>{
    const options = formData.options
    options.forEach((op) => {
      op.correct = false
    })
    options[e.target.value].correct = true
    setFormData((prevData) => {
      return{...prevData, options: options}
    });
  }

  const handleOptionInput = (e) =>{
    const id = e.target.dataset.id;
    const options = formData.options;
    options[id].value = e.target.value;
    setFormData((prevState) => { return {...prevState, options: options} })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const flag = false;
    formData.options.forEach((o) => {
      if(o.value == ""){
        flag = true
      }
    })

    formData.options.forEach((o) => {
      flag &&= !o.correct
    })
        
    if (formData.question == ""){
      flag = true
      console.log("empty text")
    } 

    if(formData.categoryId === ""){
      flag = true
      console.log("can not submitted without category id")
    }

    if(flag){
      console.log("cannot submitted");
      return

    }else{
      axios.put(`http://localhost:5000/api/question/update/${id}`, formData).then(
        (res) =>{
          console.log(res);
          window.location.reload();
        }
      ).catch(
        (err) =>{
          console.log(err)
        }
      )
    }
  }

  if (reactQuill && formData) {
    return (

    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      className="table">
        <form onSubmit={handleSubmit}>
          <reactQuill.default
            theme='snow'
            name="question"
            value={formData.question}
            onChange={questionChange}
            style={{minHeight: '300px'}}
          />

          <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    required={true}
          >
          <div>
            <Radio value={0} onChange={handleRadio} checked={formData.options[0].correct}/>
            <input data-id={0} onChange={handleOptionInput} required={true} value={formData.options[0].value}/>
          </div>
          <div>
            <Radio value={1} onChange={handleRadio}  checked={formData.options[1].correct}/>
            <input data-id={1} onChange={handleOptionInput} required={true} value={formData.options[1].value}/>
          </div>
          <div>
            <Radio value={2} onChange={handleRadio}  checked={formData.options[2].correct}/>
            <input data-id={2} onChange={handleOptionInput} required={true} value={formData.options[2].value}/>
          </div>
          <div>
            <Radio value={3} onChange={handleRadio}  checked={formData.options[3].correct}/>
            <input data-id={3} onChange={handleOptionInput} required={true} value={formData.options[3].value}/>
          </div>
          </RadioGroup>

          <FormControl fullWidth style={{marginTop: "30px", marginBottom: "30px"}}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.categoryId}
              label="Age"
              onChange={handleCatChange}
              displayEmpty
              required
            >
              <MenuItem value="">choose one</MenuItem>
              { 
              catList.map( (cat) => (
                <MenuItem value={cat.id}>{cat.name}</MenuItem>
              ))
              }
  
            </Select>
          </FormControl>

          <reactQuill.default
            theme='snow'
            name="answer"
            value={formData.explanation}
            onChange={answerChange}
            style={{minHeight: '300px'}}
          />

          <input type="submit" value="submit"/>
        </form>
      </Box>
    </Box>
    )
  }else{
    return (<p>loading..</p>)
  }
}
