import React from 'react';
import Container from 'react-bootstrap/Container';
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

const DenseTable: (props: { routeData: PulledDataFromTest; routeName?: string }) => JSX.Element = ({
    routeData,
    routeName,
}) => {
    const classes = useStyles();

    const rpsArr: string[] = [];

    const resultArr: {
        fnName: string;
        elapsedTimes: number[];
    }[] = [];

    //pushing rps to an array
    Object.keys(routeData).forEach((rps) => {
        rpsArr.push(rps);
    });

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
    const rows: string[][] = [];
    const rows2: string[][] = [[
        'Total Response Time'
    ],[
        'Successful Response count'
    ],[
        'Error count'
    ],[
        'Error %'
    ]];
    for (const rps of rpsArr) {
        rows2[0].push(routeData[rps][routeName as string].receivedTime + " ms");
        rows2[1].push((routeData[rps][routeName as string].successfulResCount as number).toString());
        rows2[2].push((routeData[rps][routeName as string].errorCount as number).toString());
        const errorPercent: number = 100*(((routeData[rps][routeName as string].errorCount as number) / (routeData[rps][routeName as string].successfulResCount as number)))
        rows2[3].push(errorPercent.toFixed(2) + "%")
    }

    const rowsHeaders: string[] = [] = ['Middleware of ' + routeName, ...rpsArr];
    const rowsHeaders2: string[] = [] = ['', ...rpsArr]
    for (const middlewareData of resultArr) {
        rows.push([middlewareData.fnName, ...middlewareData.elapsedTimes.map((e) => e.toString())]);
    }
    return (
        <Container className={'mb-5'}>
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    {rowsHeaders.map((rps, i) => (
                        <TableCell key={`rps-${i}`} align={i === 0 ? 'left' : 'right'}>
                            {i === 0 ? rps : `RPS - ${rps} `}
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
                    <TableHead>
                        <TableRow>
                            {rowsHeaders2.map((rps, i) => (
                                <TableCell key={`rps-${i}`} align={i === 0 ? 'left' : 'right'} height={"30px"}>
                                    {i === 0 ? rps : ``}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows2.map((row, i) => (
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
                                        >{`${ele}`}</TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default DenseTable;