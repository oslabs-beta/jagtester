import React from 'react';
import { Bar } from 'react-chartjs-2';
import { PulledDataFromTest, ChartDataSet } from '../../interfaces';

import { useAppSelector } from '../../state/hooks';

const shadedColor = (
    index: number,
    totalCount: number,
    darkMode: boolean,
    color1 = [255, 175, 145],
    color2 = [30, 32, 60]
) => {
    const finalColor = [];
    for (let i = 0; i < 3; i++) {
        let color = color1[i] + (index * (color2[i] - color1[i])) / totalCount;
        if (darkMode) color = 255 - (255 - color) * 0.8;
        finalColor.push(Math.floor(color));
    }
    return `rgba(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]}, 1)`;
    // return '#' + Math.floor(Math.random() * 16777215).toString(16)
};

const StackedBar: (props: {
    testData: PulledDataFromTest;
    singleRoute: boolean;
    routeName?: string;
}) => JSX.Element = ({ testData, singleRoute, routeName }) => {
    const darkMode = useAppSelector((state) => state.darkMode);
    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: singleRoute ? `Route - ${routeName}` : 'All routes',
                color: darkMode ? 'white' : 'black',
                font: {
                    size: '30rem',
                },
            },
        },
        responsive: true,
        color: darkMode ? 'white' : 'black',
        scales: {
            x: {
                title: {
                    text: 'RPS',
                    display: true,
                    color: darkMode ? 'white' : 'black',
                },
                stacked: singleRoute,
                ticks: {
                    color: darkMode ? 'white' : 'black',
                },
                grid: {
                    color: darkMode ? '#606060' : '#dddddd',
                },
            },
            y: {
                title: {
                    text: 'milliseconds',
                    display: true,
                    color: darkMode ? 'white' : 'black',
                },
                stacked: singleRoute,
                beginAtZero: true,
                ticks: {
                    color: darkMode ? 'white' : 'black',
                },
                grid: {
                    color: darkMode ? '#606060' : '#dddddd',
                },
            },
            yError: {
                display: !singleRoute,
                position: 'right',
                title: {
                    text: 'Error %',
                    display: true,
                    color: darkMode ? 'white' : 'black',
                },
                stacked: false,
                beginAtZero: true,
                ticks: {
                    color: darkMode ? 'white' : 'black',
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    const dataSetArray: ChartDataSet[] = [];
    const rpsArr: string[] = [];

    //this object will have property of each route, with an array of recieved times
    const resultObj: {
        [key: string]: {
            elapsedTimes: number[];
            errorCounts: number[];
        };
    } = {};

    const resultArr: {
        fnName: string;
        elapsedTimes: number[];
    }[] = [];

    if (singleRoute) {
        //pushing rps to an array
        Object.keys(testData).forEach((rps) => {
            rpsArr.push(rps);
        });

        // pushing function names of the first rps group at routenmae
        testData[rpsArr[0]][routeName as string].middlewares.forEach((middlewareObj) => {
            resultArr.push({ fnName: middlewareObj.fnName, elapsedTimes: [] });
        });

        // pushing all the elapsed times for each route from the all rps groups
        resultArr.forEach((middlewareObj, i) => {
            Object.keys(testData).forEach((rps) => {
                middlewareObj.elapsedTimes.push(
                    testData[rps][routeName as string].middlewares[i].elapsedTime
                );
            });
        });

        for (let i = 0; i < resultArr.length; i++) {
            dataSetArray.push({
                type: 'bar',
                label: resultArr[i].fnName,
                data: resultArr[i].elapsedTimes,
                backgroundColor: [shadedColor(i, resultArr.length, darkMode)],
                borderWidth: 0,
            });
        }
    } else {
        Object.keys(testData).forEach((rps) => {
            rpsArr.push(rps);
            // then for each key, pull the route as a label
            //add to object as a property
            //then grab recieved time and put in an array for value in onj
            Object.keys(testData[rps]).forEach((route) => {
                if (!resultObj[route]) {
                    resultObj[route] = {
                        elapsedTimes: [],
                        errorCounts: [],
                    };
                }
                resultObj[route].elapsedTimes.push(testData[rps][route].receivedTime as number);
                resultObj[route].errorCounts.push(
                    Math.round(
                        (100 * (testData[rps][route].errorCount as number)) /
                            ((testData[rps][route].successfulResCount as number) +
                                (testData[rps][route].errorCount as number))
                    )
                );
            });
        });
        //create a background color array?
        //have them select color scheme? or colors per route?

        //loop through the resultObj to create the dataset array on objs per route/ property
        Object.keys(resultObj).forEach((route, i) => {
            const lineColor = shadedColor(i, Object.keys(resultObj).length, darkMode);
            dataSetArray.push({
                type: 'bar',
                label: route,
                data: resultObj[route].elapsedTimes,
                backgroundColor: [lineColor],
                borderWidth: 0,
                order: 2,
            });
            const lineColorRed = shadedColor(
                i,
                Object.keys(resultObj).length,
                darkMode,
                [100, 25, 25],
                [220, 50, 50]
            );
            dataSetArray.push({
                type: 'line',
                label: `Error percent for ${route}`,
                yAxisID: 'yError',
                data: resultObj[route].errorCounts,
                backgroundColor: [lineColorRed],
                borderColor: lineColorRed,
                borderWidth: 4,
                fill: false,
                order: 1,
            });
        });
    }

    // setChartData({ labels: rpsArr, datasets: dataSetArray });
    const chartData: { labels: string[]; datasets: ChartDataSet[] } = {
        labels: rpsArr,
        datasets: dataSetArray,
    };

    return <Bar type="undefined" data={chartData} options={chartOptions} />;
};

export default StackedBar;
