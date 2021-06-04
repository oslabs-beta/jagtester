import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

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

const StackedBar: (props: {
    testData: {
        [key: string]: {
            [key: string]: CollectedDataSingle | CollectedData;
        };
    };
}) => JSX.Element = (props) => {
    // console.log(props.testData);
    const [chartData, setChartData] = useState({});

    interface dataSet {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderWidth: number;
    }

    function createDataSet(
        data: {
            [key: string]: {
                [key: string]: CollectedDataSingle | CollectedData;
            };
        }[]
    ) {
        //function definition
        console.log(data);
        const dataSetArray: dataSet[] = [];

        // const resultObj: {route: number[]} = {};

        for (const timedData of data) {
            for (const rps in timedData.testData) {
                for (const route in timedData.testData[rps]) {
                }
                // dataSetArray.push({
                //   label: route,
                // if (!resultObj[route]){
                //   resultObj[route] = []
                //   resultObj[route].push(resultObj[route][recievedTime])
                // } else {
                //   resultObj[route].push(resultObj[route][recievedTime])
                // }
            }
        }

        //then we would loop through
    }
    const chart = () => {
        const rpsArr: string[] = [];
        const routeArr: string[] = [];
        const dataArr: number[] = [];
        //key would = localhost3030

        Object.keys(props.testData).forEach((key) => {
            if (key != 'default') {
                rpsArr.push(key);
            }
        });
        // createDataSet(props.testData);

        setChartData({
            labels: rpsArr,
            datasets: [
                {
                    type: 'bar',
                    label: '/',
                    data: [0.834, 0.959, 1.098, 1.331, 1.745, 2.341, 4.97, 17.767, 145.613, 232.117, 217.052],
                    backgroundColor: ['rgba(74, 178, 152, 0.91)'],
                    borderWidth: 0,
                },
                {
                    type: 'bar',
                    label: '/testroute',
                    data: [
                        352.242, 351.393, 351.791, 351.84, 352.162, 352.824, 355.429, 368.33, 504.184, 573.987, 511.653,
                    ],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)'],
                    borderWidth: 0,
                },
                {
                    type: 'line',
                    label: 'Error for /',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 147, 408],
                    backgroundColor: ['rgba(129, 178, 154, 1)'],
                    borderColor: 'rgba(224, 122, 95, 1)',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    label: 'Error for /testroute',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 581, 1653],
                    backgroundColor: ['rgba(129, 178, 154, 1)'],
                    borderColor: 'rgba(224, 122, 95, 1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        });
    };

    useEffect(() => {
        fetch('/api/saveddata')
            .then((res) => res.json())
            .then((data) => {
                console.log(createDataSet(data));
            })
            .catch((err) => console.log(err)); // FIXME better error handling
        chart();
    }, []);

    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: 'JAGtester Results',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: false,
            },
        },
    };

    return (
        <div className="Chart">
            <div>
                <Bar type="undefined" data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default StackedBar;

//update to TS

//iterate through the array
// for each route push jsx string with an onclick event that will show data related to the specific route
