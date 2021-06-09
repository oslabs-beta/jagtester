// import { stubFalse } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CollectedData, CollectedDataSingle, ChartDataSet } from '../../interfaces';

const MiddlewareGraph: (props: {
    testData: {
        [key: string]: {
            [key: string]: CollectedDataSingle | CollectedData;
        };
    };
}) => JSX.Element = () => {
    // const [chartData, setChartData] = useState([]);

    // const chartOptions = {
    //     plugins: {
    //         title: {
    //             display: true,
    //             text: 'Route Specific Middleware Results',
    //         },
    //     },
    //     responsive: true,
    //     scales: {
    //         x: {
    //             stacked: true,
    //         },
    //         y: {
    //             stacked: true,
    //             beginAtZero: false,
    //         },
    //     },
    // };

    // const chart = (props: {
    //     testData: {
    //         [key: string]: {
    //             [key: string]: CollectedDataSingle | CollectedData;
    //         };
    //     };
    // }) => {
    //     //need to create functionality to create separate charts
    //     //based on amount or routes
    //     //this functionality needs to be able to update chart options as well
    //     //the title/ text needs to be the route name

    //     const dataSetArray: DataSet[] = [];
    //     const rpsArr: string[] = [];

    //     //declare an object to store data in a way to iterate through for datasets
    //     //keys will be the routes
    //     //value will be an array of the middleware times
    //     //create another obj for route and middleware names?
    //     const resultObj: any = {};

    //     //this will hold middleware names
    //     //keys will be the routes and value will be an array or middleware names
    //     const middlewareNameObj: any = {};

    //     //creates the array for the RPS labels at bottom of chart
    //     Object.keys(props.testData).forEach((rps) => {
    //         if (rps != 'default') {
    //             rpsArr.push(rps);
    //         }
    //         Object.keys(props.testData[rps]).forEach((route) => {
    //             if (!middlewareNameObj[route]) {
    //                 middlewareNameObj[route] = {};
    //                 for (const middlewares in props.testData[rps][route]) {
    //                     if (middlewares === 'middlewares') {
    //                         const dataArray = props.testData[rps][route].middlewares;

    //                         props.testData[rps][route].middlewares.forEach((middlewareObj) => {
    //                             // dataArray.forEach(middlewareObj => {
    //                             // console.log(middlewareObj.fnName)
    //                             const name = middlewareObj.fnName;
    //                             middlewareNameObj[route][name] = [];
    //                             // middlewareNameObj[route].push(middlewareObj.fnName)
    //                         });
    //                     }
    //                 }
    //             }
    //             for (const middlewares in props.testData[rps][route]) {
    //                 if (middlewares === 'middlewares') {
    //                     props.testData[rps][route].middlewares.forEach((middlewareObj) => {
    //                         const name = middlewareObj.fnName;
    //                         middlewareNameObj[route][name].push(middlewareObj.elapsedTime);
    //                     });
    //                 }
    //             }
    //         });
    //     });

    //     // setChartData({labels: rpsArr, datasets: dataSetArray})
    // };

    // useEffect(() => {
    //     // fetch('/api/saveddata')
    //     //     .then((res) => res.json())
    //     //     .then((data) => {
    //     //         console.log(createDataSet(data));
    //     //     })
    //     //     .catch((err) => console.log(err)); // FIXME better error handling
    //     chart(props);
    // }, []);

    // return (
    //     <div className="Chart">
    //         <div>
    //             <Bar type="undefined" data={chartData} options={chartOptions} />
    //             <Bar type="undefined" data={chartData} options={chartOptions} />
    //         </div>
    //     </div>
    // );
    return <div>test stacked</div>;
};

export default MiddlewareGraph;
