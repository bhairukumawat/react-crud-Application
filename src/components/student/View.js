import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { useParams, useNavigate} from "react-router-dom";
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
const View = () => {
    const {id}= useParams();
    // const navigate=useNavigate(); 
    
    console.log(id)
    const classes = useStyles();
    const navigate = useNavigate();
    const [student,setStudent]=useState([])
 useEffect(()=>{getStudent()

 },[])
 async function getStudent(){
    try{console.log("snt")
        const student=await axios.get(`http://localhost:4000/student/${id}`)
setStudent(student.data)
console.log(student.data)
    }catch(error){
        console.log("Something is wrong")
    }

 }

 function handleClick(){
    navigate('/');

 }

    return (<>


          
                <Box textAlign="center"
                    p={2}
                    className={
                        classes.stuListColor
                }>
                    <Typography variant="h4">Student Details</Typography>
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
                                }>Id.</TableCell>
                                <TableCell align="center"
                                    className={
                                        classes.tableHeadCell
                                }>Name</TableCell>
                                <TableCell align="center"
                                    className={
                                        classes.tableHeadCell
                                }>Email</TableCell>
                              
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">{student.id}</TableCell>
                                <TableCell align="center">{student.stuname}</TableCell>
                                <TableCell align="center">{student.email}</TableCell>
                              
                            </TableRow>

                        </TableBody>
                    </Table>


                </TableContainer>

                <Box m={3}
                    textAlign="center">
                    <Button  onClick={handleClick} variant="contained" color="primary">Back to Home</Button>
                </Box>
         
    </>)
}

export default View
