import { useState, useEffect, useRef} from 'react';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Sidebar from '../../../components/admin/Sidebar';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function QuestionNew() {
  const [reactQuill, setReactQuill] = useState();
  const [correct, setCorrect] = useState('');
  const [question, setQuestion] = useState('');
  const [catList, setCatList] = useState([]);
  const [explanation, setExplanation] = useState(0);

  const formInitial = {
    question: "",
    options: [
      {value: "", correct: false},
      {value: "", correct: false},
      {value: "", correct: false},
      {value: "", correct: false}
    ],
    explanation:"",
    categoryId: ""
  }
  const [ formData, setFormData ] = useState(formInitial);


  useEffect(() => {
    if (typeof window !== "undefined") {
      
      import("react-quill").then((mod) => {
        setReactQuill(mod);
      });
    }
    axios.get('http://localhost:5000/api/category').then(
      (res) => {
        console.log(res.data);
        setCatList(res.data);
      }
    )
  }, []);

  const questionChange = (content, delta, source, editor) =>{
    console.log(content)
    if(editor.getText() !== ""){
      setQuestion(content)
    }else{
      setQuestion("")
    }
  }

  const handleCatChange = (event) => {
    console.log(formData.categoryId)
    setFormData((prevState) => { return { ...prevState, categoryId: event.target.value}})
  }

  const answerChange = (content, delta, source, editor) =>{
    if(editor.getText() !== ""){
      setExplanation(content)
    }else{
      setExplanation("")
    }
  }

  const handleRadio = (e) =>{
    console.log(formData);
    console.log(e.target.value);
    setCorrect(e.target.value);
  }

  const handleOptionInput = (e) =>{
    const id = e.target.dataset.id;
    const options = formData.options;
    options[id].value = e.target.value;
    setFormData((prevState) => { return {...prevState, options: options} })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const options = formData.options;
  
    const flag = false;
    options.forEach((o) => {
      if(o.value == ""){
        flag = true
      }
    })
    
    if (question == ""){
      flag = true
      console.log("empty text")
    } 

    if(correct === ''){
      flag = true
      console.log("option is not selected")
    }

    if(formData.categoryId === ""){
      flag = true
      console.log("can not submitted without category id")
    }

    if(flag){
      console.log("cannot submitted");

    }else{
     //let submitData = new FormData();
      const tempData =  JSON.parse(JSON.stringify(formData))
      tempData['options'][correct]['correct'] = true;
      tempData.question = question;
      tempData.explanation = explanation;
      console.log(tempData)
      axios.post('http://localhost:5000/api/question/create', tempData).then(
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

  if (reactQuill) {
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
            value={question || ""}
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
            <Radio value={0} onChange={handleRadio}/>
            <input data-id={0} onChange={handleOptionInput} required={true}/>
          </div>
          <div>
            <Radio value={1} onChange={handleRadio}/>
            <input data-id={1} onChange={handleOptionInput} required={true}/>
          </div>
          <div>
            <Radio value={2} onChange={handleRadio}/>
            <input data-id={2} onChange={handleOptionInput} required={true}/>
          </div>
          <div>
            <Radio value={3} onChange={handleRadio}/>
            <input data-id={3} onChange={handleOptionInput} required={true}/>
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
            value={explanation || ""}
            onChange={answerChange}
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
