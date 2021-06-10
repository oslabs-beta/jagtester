import { stubFalse } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CollectedData, CollectedDataSingle, DataSet } from './resultInterfaces'


const StackedBar: (props: {
    testData: {
        [key: string]: {
            [key: string]: CollectedDataSingle | CollectedData;
        };
    };
}) => JSX.Element = (props) => {
    // console.log(props.testData);
    const [chartData, setChartData] = useState({});
    
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
                stacked: false,
            },
            y: {
                stacked: false,
                beginAtZero: false,
            },
        },
    };


    const chart = (props: {
        testData: {
            [key: string]: {
                [key: string]: CollectedDataSingle | CollectedData;
            };
        };
    }) => {
    
            
        const dataSetArray: DataSet[] = [];
        const rpsArr: string[] = [];
        console.log(dataSetArray)
            
        
        //this object will have property of each route, with an array of recieved times
        const resultObj: any = {};
            
        //TODO: create an result OBJ for errors
            
            
        Object.keys(props.testData).forEach((key) => {
            if (key != 'default') {
                rpsArr.push(key);
                // then for each key, pull the route as a label
                //add to object as a property
                //then grab recieved time and put in an array for value in onj
                Object.keys(props.testData[key]).forEach((route) => {
                    if (!resultObj[route]){
                        resultObj[route] = [];
                        resultObj[route].push(props.testData[key][route].receivedTime);
                    } else {
                        resultObj[route].push(props.testData[key][route].receivedTime);
                    }
                });
            }
        });
        
        //create a background color array?
        //have them select color scheme? or colors per route?

        //loop through the resultObj to create the dataset array on objs per route/ property
        Object.keys(resultObj).forEach(route => {
            dataSetArray.push({
                type: 'bar',
                label: route,
                data: resultObj[route],
                backgroundColor: ['rgba(74, 178, 152, 0.91)'],
                borderWidth: 0,
            });
        });
           
        setChartData({labels: rpsArr, datasets: dataSetArray})
   
    };

    useEffect(() => {
        // fetch('/api/saveddata')
        //     .then((res) => res.json())
        //     .then((data) => {
            //         console.log(createDataSet(data));
            //     })
            //     .catch((err) => console.log(err)); // FIXME better error handling
            chart(props);

        }, []);

    return (
        <div className="Chart">
            <div>
                <Bar type="undefined" data={chartData} options={chartOptions} />
            </div>
        </div>
    ); 
};

export default StackedBar;


        
        // setChartData({
        // labels: rpsArr,
        // datasets: 
        // [
        //     {
        //         type: 'bar',
        //         label: '/',
        //         data: [0.834, 0.959, 1.098, 1.331, 1.745, 2.341, 4.97, 17.767, 145.613, 232.117, 217.052],
        //         backgroundColor: ['rgba(74, 178, 152, 0.91)'],
        //         borderWidth: 0,
        //             },
        //             {
        //                 type: 'bar',
        //                 label: '/testroute',
        //                 data: [
        //                     352.242, 351.393, 351.791, 351.84, 352.162, 352.824, 355.429, 368.33, 504.184, 573.987, 511.653,
        //                 ],
        //                 backgroundColor: ['rgba(75, 192, 192, 0.6)'],
        //                 borderWidth: 0,
        //             },
        //             {
        //                 type: 'line',
        //                 label: 'Error for /',
        //                 data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 147, 408],
        //                 backgroundColor: ['rgba(129, 178, 154, 1)'],
        //                 borderColor: 'rgba(224, 122, 95, 1)',
        //                 borderWidth: 2,
        //                 fill: false,
        //             },
        //             {
        //                 type: 'line',
        //                 label: 'Error for /testroute',
        //                 data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 581, 1653],
        //                 backgroundColor: ['rgba(129, 178, 154, 1)'],
        //                 borderColor: 'rgba(224, 122, 95, 1)',
        //                 borderWidth: 2,
        //                 fill: false,
        //             },
        //         ],
        //     });