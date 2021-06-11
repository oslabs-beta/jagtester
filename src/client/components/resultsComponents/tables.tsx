import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { PulledDataFromTest } from '../../interfaces';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const DenseTable: (props: { routeData: PulledDataFromTest; routeName?: string; singleRoute: boolean }) => JSX.Element = ({
    routeData,
    routeName,
    singleRoute
}) => {
    const classes = useStyles();

    const rpsArr: string[] = [];

    const resultArr: {
        fnName: string;
        elapsedTimes: number[];
    }[] = [];

    const rows: any[][] = [];
    let rowsHeaders: string[] = [];

    //pushing rps to an array
    Object.keys(routeData).forEach((rps) => {
        rpsArr.push(rps);
    });

    if(!singleRoute){
        // pushing function names of the first rps group at routenmae
        routeData[rpsArr[0]][routeName as string].middlewares.forEach((middlewareObj) => {
            resultArr.push({ fnName: middlewareObj.fnName, elapsedTimes: [] });
        });

        // pushing all the elapsed times for each route from the all rps groups
        resultArr.forEach((middlewareObj, i) => {
            Object.keys(routeData).forEach((rps) => {
                middlewareObj.elapsedTimes.push(
                    routeData[rps][routeName as string].middlewares[i].elapsedTime
                );
            });
        });
        rowsHeaders = ['Middleware of ' + routeName, ...rpsArr];
        for (const middlewareData of resultArr) {
            rows.push([middlewareData.fnName, ...middlewareData.elapsedTimes.map((e) => e.toString())]);
        }
    }else {
        const resultObj: {
            [key: string]: {
                receivedTimes: number[];
                successfulCounts: number[];
                errorCounts: number[];
            };
        } = {};
        
        Object.keys(routeData).forEach((rps) => {
            rpsArr.push(rps);
            // then for each key, pull the route as a label
            //add to object as a property
            //then grab recieved time and put in an array for value in onj
            Object.keys(routeData[rps]).forEach((route) => {
                if (!resultObj[route]) {
                    resultObj[route] = {
                        receivedTimes: [],
                        successfulCounts: [],
                        errorCounts: [],
                    };
                }
                resultObj[route].receivedTimes.push(routeData[rps][route].receivedTime as number);
                resultObj[route].errorCounts.push(routeData[rps][route].errorCount as number);
                resultObj[route].successfulCounts.push(routeData[rps][route].successfulResCount as number)
            })
          });

        rowsHeaders = ['', ...rpsArr];
        for (const route in resultObj) {
            for(const rowData in resultObj[route]){
                rows.push(resultObj[route as string][rowData] as number[]);
            }
        }
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow></TableRow>
                    <TableRow>
                        {rowsHeaders.map((rps, i) => (
                            <TableCell key={`rps-${i}`} align={i === 0 ? 'left' : 'right'}>
                                {i === 0 ? rps : `Interval at ${rps} RPS`}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={`table-${i}`}>
                            {row.map((ele, j) => {
                                return j === 0 ? (
                                    <TableCell key={`cell-${j}`} component="th" scope="row">
                                        {ele}
                                    </TableCell>
                                ) : (
                                    <TableCell
                                        align="right"
                                        key={`cell-${j}`}
                                    >{`${ele} ms`}</TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DenseTable;