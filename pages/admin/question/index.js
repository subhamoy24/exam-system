import { React, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../../../components/admin/Sidebar';
import axios from 'axios';
import BootstapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function QuestionIndex() {
  const [ record, setRecord ] = useState([]);

  const fetchQuestions = async () => {
    try{
      const path = "http://localhost:5000/api/question";
      const data = await axios.get(path);
      console.log(data);
      setRecord(data.data);
    }catch(e){
      console.log(e)
    }
  }

  const columns = [
    { dataField: "id", text: "#ID"
    },
    { dataField: "description", text: "Description",
      formatter: (cell, row) => {
        return <div dangerouslySetInnerHTML={{ __html: row.description }} />
      }
    },
    {
      dataField: "QuestionCategory",
      text: "Category",
      formatter: (cell, row) => row.QuestionCategory.name
    },
    { text: "Edit",
      formatter: (cell, row) => {
        return <a href={`http://localhost:5000/admin/question/edit/${row.id}`} title="edit question">{row.id}</a>
      } 
    }
  ]

  useEffect(() => {
    fetchQuestions();
  }, [])
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
      <BootstapTable
       keyField='name'
       data= {record}
       columns={columns}
       pagination={paginationFactory()}
      >

      </BootstapTable>
      </Box>
    </Box>
  );
}
