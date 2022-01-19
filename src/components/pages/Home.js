import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import axios from "axios"
import { useState,useEffect } from "react";

import {
    Typography,
    Box,
    makeStyles,
    Input,
    Grid,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    TextField,
    Button
} from '@material-ui/core';
import {deepPurple, green, orange} from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    headingColor: {
        backgroundColor: deepPurple[400],
        color: "white"
    },
    addStuColor: {
        backgroundColor: green[400],
        color: "white"
    },
    stuListColor: {
        backgroundColor: orange[400],
        color: "white"
    },
    tableHeadCell: {
        color: "white",
        frontWeight: "bold",
        frontSize: 16
    }

})
const Home = () => {
 const [students,setStudents]=useState([])
 const [studentform,setStudentform]=useState({
stuname:"",
email:""
 })
const [status,setStatus]=useState(false)
 function onTextFieldChange(e){
    setStudentform({
        ...studentform,
        [e.target.name]:e.target.value})
 }

 useEffect(()=>{getAllStudent()

 },[])
 async function getAllStudent(){
    try{console.log("snt")
        const student=await axios.get("http://localhost:4000/student/")
setStudents(student.data)
    }catch(error){
        console.log("Something is wrong")
    }

 }
 async function onFormSubmit(e){
     e.preventDefault();
     try{console.log("snt")
     await axios.post("http://localhost:4000/student/",studentform)
     setStatus(true)
 }catch(error){
     console.log("Something is wrong in post")
 }
 }

    const classes = useStyles();

   if(status){
       return <Home/>
   }

const handeleDelete=async id =>{
    console.log(id)
    await axios.delete(`http://localhost:4000/student/${id}`)
    var newstudent = students.filter((item) => {
        return item.id !==id;

    })
    setStudents(newstudent);
}

    return (<>
        <Box textAlign="center"
            className={
                classes.headingColor
            }
            p={2}>
            <Typography>React Crud With Api Call</Typography>

        </Box>
        <Grid container justify="center" spacing={2}>
            <Grid item
                md={6}
                xs={12}>
                <Box textAlign="center"
                    p={2}
                    className={
                        classes.addStuColor
                    }
                    mb={2}>
                    <Typography variant="h4">Add Student</Typography>
                </Box>
                <form noValidate>
                    <Grid container
                        spacing={2}>
                        <Grid item
                            xs={12}>
                            <TextField autoComplete="stuname"   onChange={e=>onTextFieldChange(e)}  name="stuname" variant="outlined" required fullWidth id="stuname" label="Name"></TextField>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <TextField autoComplete="email"   onChange={e=>onTextFieldChange(e)}   name="email" variant="outlined" required fullWidth id="email" label="Email Address"></TextField>
                        </Grid>
                    </Grid>
                    <Box m={3}>
                        <Button type="submit" onClick={e=>onFormSubmit(e)} variant="contained" color="primary" fullWidth>
                            Add</Button>
                    </Box>
                </form>
            </Grid>
            <Grid item
                md={6}
                xs={12}>
                <Box textAlign="center"
                    p={2}
                    className={
                        classes.stuListColor
                }>
                     <Typography variant="h4">Student List</Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={
                                {backgroundColor: "#616171"}
                            }>
                                <TableCell align="center"
                                    className={
                                        classes.tableHeadCell
                                }>No.</TableCell>
                                <TableCell align="center"
                                    className={
                                        classes.tableHeadCell
                                }>Name</TableCell>
                                <TableCell align="center"
                                    className={
                                        classes.tableHeadCell
                                }>Email</TableCell>
                                <TableCell align="center"
                                    className={
                                        classes.tableHeadCell
                                }>Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
         {students.map((item,i)=>{
             return(

                <TableRow key={i+1}>
                <TableCell align="center">{i+1}</TableCell>
                <TableCell align="center">{item.stuname}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center"> 
                <Tooltip title="View"> 
                <IconButton><Link to={`/view/${item.id}`}><VisibilityIcon 
                color="primary"></VisibilityIcon></Link></IconButton>
                </Tooltip>
               < Tooltip title="Edit"> 
                <IconButton><Link to={`/edit/${item.id}`}><EditIcon 
                ></EditIcon></Link></IconButton>
                </Tooltip>
                < Tooltip title="Delete"> 
                <IconButton  onClick={()=>handeleDelete(item.id)} ><DeleteIcon color="secondary"
                ></DeleteIcon></IconButton>
                </Tooltip>
                </TableCell>
            </TableRow> 
             )
          })}


                        </TableBody>
                    </Table>


                </TableContainer>
            </Grid>
        </Grid>
    </>)
}

export default Home
