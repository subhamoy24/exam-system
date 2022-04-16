import { React, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sidebar from '../../../../components/admin/Sidebar';
import axios from 'axios';
import BootstapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';


export default function QuestionIndex() {
  const [ record, setRecord ] = useState([]);
  const [ selectedQuestion, setSelectedQuestion ] = useState([]);
  const [ testDetails, setTestDetails] = useState(null);

  let router = useRouter();
  const { id } = router.query;

  const fetchQuestions = async () => {
    const path = "http://localhost:5000/api/question";
    await axios.get(path).then(
      (res) => {
        console.log(res);
        setRecord(res.data);

      }
    ).catch((e)=>{
      console.log(e)
    })
  }

  const sendQuestion = async () =>{
    const path = `http://localhost:5000/api/test/${id}/update-questions`;
    const formData ={
      questionIds: selectedQuestion
    }
    await axios.post(path, formData).then(
      (res) =>{
        console.log(res.data)
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }

  const fetchTestDetais = async () => {
    const path = `http://localhost:5000/api/test/${id}`;
    await axios.get(path).then(
      (res) => {
        console.log(res);
        setTestDetails(res.data);
      }
    );
  }

  useEffect(() => {
    if(router.isReady){
      fetchQuestions();
      fetchTestDetais();
    }
  }, [router.isReady])
  

  const columns = [
    { 
      dataField: "id", 
      text: "#ID" 
    },
    { 
      dataField: "description", 
      text: "Description",
      formatter: (cell, row) => {
        return <div dangerouslySetInnerHTML={{ __html: row.description }} />
      }
    },
    {
      dataField: "QuestionCategory",
      text: "Category",
      formatter: (cell, row) => row.QuestionCategory.name
    },
  ]

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log(selectedQuestion);
      if(isSelect){
        setSelectedQuestion((prevList) => prevList.concat(row.id));
      }else{
        setSelectedQuestion((prevList) => prevList.filter((item) => { return item !== row.id }));
      }
      console.log(isSelect);
      console.log(row.id);
    },
    onSelectAll: (isSelect, rows, e) => {
      console.log(selectedQuestion);
      console.log(isSelect);
      let sq = selectedQuestion.slice(0);
      if(isSelect){
        rows.forEach((row) =>{
          if(!sq.includes(row.id)){
            sq.push(row.id)
          }
        })
        console.log(sq)
        setSelectedQuestion(sq);
      }else{
        rows.forEach((row) =>{
          sq = sq.filter((item) => { return item !== row.id })
        })
        setSelectedQuestion(sq);
      }
    }
  };
  if(testDetails){
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <div>{testDetails.name}</div>
        <div>{testDetails.description}</div>
        <div>{testDetails.duration}</div>
        
        <BootstapTable
          keyField='id'
          data= {record}
          columns={columns}
          pagination={paginationFactory()}
          selectRow={selectRow}
        />

        <Button onClick={sendQuestion} variant="contained">update</Button>
      </Box>
    </Box>
  );}
  else{
    return "loading..."
  }
}
