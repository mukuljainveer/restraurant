import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import IconButton from '@material-ui/core/IconButton';
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useSelector} from "react-redux";

const StyledTableCell = withStyles((theme) => ({
  head: {
    textAlign:'center',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  scrollable:{

  }
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [loading,setLoading]=useState(false)
  function createData(name) {
    return { name };
  }

  let data=useSelector(state=>{
    return state.Restaurant.data;
  })

  const [rows,setRows] = useState([]);

  useEffect(()=>{
    data.map(restaurant=>{
        return rows.push(createData(restaurant.name))
    })
    setRows(rows)
    setLoading(true)
  },[data,rows])


  return (
      <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow >
              <StyledTableCell>S.No</StyledTableCell>
              {props.headers.map((item,index)=>{
                return(<StyledTableCell key={index} align="right">{item}</StyledTableCell>)
              })}
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          {loading?
              <TableBody>
                {rows.map((row,index) => (
                    <StyledTableRow  key={row.name}>
                      <StyledTableCell style={{textAlign:'center'}}  component="th" scope="row">
                        {index+1}
                      </StyledTableCell>
                      <StyledTableCell style={{textAlign:'center'}}  component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell style={{textAlign:'center'}} align="right">
                        <IconButton onClick={()=>props.editHandler(index+1)} aria-label="add an alarm">
                          <CreateIcon />
                        </IconButton>
                        <IconButton onClick={()=>props.viewHandler(index+1)}>
                          <VisibilityIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                ))}
              </TableBody>
          :''}
        </Table>
      </TableContainer>
      </>
  );
}
