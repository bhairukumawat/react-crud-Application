import {BrowserRouter as Router, useNavigate,Routes, Route, Link} from "react-router-dom";
import { useParams} from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from "axios";

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
const Edit= () => {

    const {id}=useParams();
    const navigate = useNavigate();
    const [studentedit,setStudentedit]=useState({
        stuname:"",
        email:""
         })
         
    
         useEffect(()=>{
             
            async function getStudent(){
                try{console.log("snt")
                    const student=await axios.get(`http://localhost:4000/student/${id}`)
                    setStudentedit(student.data)
            console.log(student.data.stuname)
                }catch(error){
                    console.log("Something is wrong")
                }
            
             }
    
            getStudent()

         },[])

         function onTextFieldChange(e){
            setStudentedit({
                ...studentedit,
                [e.target.name]:e.target.value})
         }
         
 async function onFormSubmit(e){
    e.preventDefault();
    try{console.log("snt")
    await axios.put(`http://localhost:4000/student/${id}`,studentedit)
    // setStatus(true)
    navigate('/');
}catch(error){
    console.log("Something is wrong in edit")
}
}



 function handleClick(){
    navigate('/');

 }


    const classes = useStyles();
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
                            <TextField autoComplete="id" name="id"  autoFocus  value={id} disabled   variant="outlined" required fullWidth id="id" label="Id"></TextField>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <TextField autoComplete="stuname" name="stuname" onChange={e=>onTextFieldChange(e)} autoFocus value={studentedit.stuname} variant="outlined" required fullWidth id="stuname" label="Name"></TextField>
                        </Grid>
                        <Grid item
                            xs={12}>
                            <TextField autoComplete="email" name="email"  value={studentedit.email}   onChange={e=>onTextFieldChange(e)} variant="outlined" required fullWidth id="email" label="Email Address"></TextField>
                        </Grid>
                    </Grid>
                    <Box m={3}>
                        <Button type="submit"  onClick={e=>onFormSubmit(e)} variant="contained" color="primary" fullWidth>
                            Update</Button>
                    </Box>
                </form>
                <Box m={3} textAlign="center">
                    <Button   onClick={handleClick} variant="contained" color="primary"> Back To Home</Button></Box>
            </Grid>
        
        </Grid>
    </>)
}

export default Edit
