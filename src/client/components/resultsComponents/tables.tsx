import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface CollectedData {
    [key: string]: {
        reqId: string;
        reqRoute: string;
        middlewares: {
            fnName: string;
            elapsedTime: number;
        }[];
    };
}

interface CollectedDataSingle {
    receivedTime?: number;
    recordedTime?: number;
    errorCount?: number;
    requestCount?: number;
    successfulResCount?: number;
    RPS?: number;
    reqId?: string;
    reqRoute: string;
    middlewares: {
        fnName: string;
        elapsedTime: number;
    }[];
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(middleware: string, ...elapsedTimes: number[]) {
  return { middleware, ...elapsedTimes };
}

const rows: any[] = [];

type middlewareArray = {
  fnName: string;
  elapsedTime: number;
}[]



const DenseTable: (props: {
  routeData: {
    [key: string]: {
        [key: string]: CollectedDataSingle | CollectedData;
    };
  };
}) => JSX.Element = (props) => {
  const classes = useStyles();
  // console.log(props)
  function createRows(
    testData: {
      [key: string]:
        { [key: string]: CollectedData | CollectedDataSingle; 
        }; 
      }
    ){
    // const rows: {
      
    // }[] = [];
    for(const interval in testData){
      if(interval !== 'default'){
      for(const route in testData[interval]){
        const intervalArr: number[] = [];
        // console.log("testing createRows", interval, testData[interval][route].middlewares
        // console.log(testData[interval][route])
        const test: middlewareArray = testData[interval][route].middlewares as middlewareArray;
        for(const ele of test){
           intervalArr.push(ele.elapsedTime)
          }
        // }
        // console.log(intervalArr)
        // console.log(Array.isArray(test))
        // for(const element of test){
        //   intervalArr.push(element.elapsedTime)
        // }
        rows.push([createData(interval, ...intervalArr)])
     }
    }
   }
    return rows;
  }

  const testRows = createRows(props.routeData)
  // console.log(testRows)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
        <TableCell align="center" colSpan={3}>Route</TableCell>
          <TableRow>
            <TableCell align="center">Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          { {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
}

export default DenseTable;