import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {fetchNotUnpaidObjArray, fetchUnpaidObjArrayforLog} from "./api/dataFetching.mjs";
import NavLinks from "../Components/NavLinks";

async function  formatNotUnpaidObjArrayForTable(){
    return new Promise(function(resolve, reject){
        let objArray = []
        fetchNotUnpaidObjArray().then((x)=> {
            for(let elem in x){
                objArray.push({name: x[elem].name, progress: formatStatus(x[elem]), total: x[elem].amount})
            }
            resolve(objArray)
        })

    })
}

function formatStatus(obj){
    let formattedStatus = []
    if (obj.paid){
        formattedStatus = "complete"
    } else if (obj.status === "in progress" ){
        formattedStatus = "in progress"
    } else {
        formattedStatus = ""
    }
    return formattedStatus
}

export async function getStaticProps(){
    const objArray = await fetchUnpaidObjArrayforLog()
    const logObjArray = await formatNotUnpaidObjArrayForTable()

    return {
        props: {objArray, logObjArray},
        revalidate: 1,
    }
}

function BasicTable(props) {
    console.log(props.logObjArray)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align="right">progress</TableCell>
                        <TableCell align="right">total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.objArry.map((row) => (
                        <TableRow
                            key={"sd"}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.progress}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function Log(props){
    console.log(3)

    console.log(props.logObjArray)
    return(
        <div>
            {console.log(props.objArray)}
            <NavLinks objArry = {props.objArray}/>
            <BasicTable objArry={props.logObjArray}/>
        </div>
    )
}