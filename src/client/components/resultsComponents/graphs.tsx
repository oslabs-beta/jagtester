import React from 'react';
import { Bar } from 'react-chartjs-2';
import { PulledDataFromTest, ChartDataSet } from '../../interfaces';

const randomColor = (index: number, totalCount: number) => {
    const color1 = [224, 122, 95];
    const color2 = [61, 64, 91];
    const finalColor = [];
    for (let i = 0; i < 3; i++) {
        finalColor.push(
            Math.floor(color1[i] + (index * (color2[i] - color1[i])) / (totalCount - 1))
        );
    }
    return `rgba(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]}, ${0.5 + Math.random() / 2})`;
    // return '#' + Math.floor(Math.random() * 16777215).toString(16)
};

const StackedBar: (props: {
    testData: PulledDataFromTest;
    singleRoute: boolean;
    routeName?: string;
}) => JSX.Element = ({ testData, singleRoute, routeName }) => {
    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: singleRoute ? routeName : 'All routes',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: singleRoute,
            },
            y: {
                stacked: singleRoute,
                beginAtZero: true,
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

    //TODO: create an result OBJ for errors

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
                backgroundColor: [randomColor(i, resultArr.length)],
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
                            (testData[rps][route].successfulResCount as number)
                    )
                );
            });
        });
        //create a background color array?
        //have them select color scheme? or colors per route?

        //loop through the resultObj to create the dataset array on objs per route/ property
        Object.keys(resultObj).forEach((route, i) => {
            const lineColor = randomColor(i, Object.keys(resultObj).length);
            dataSetArray.push({
                type: 'bar',
                label: route,
                data: resultObj[route].elapsedTimes,
                backgroundColor: [lineColor],
                borderWidth: 0,
            });
            dataSetArray.push({
                type: 'line',
                label: `Error percent for ${route}`,
                data: resultObj[route].errorCounts,
                backgroundColor: [lineColor],
                borderColor: lineColor,
                borderWidth: 4,
                fill: false,
            });
        });
    }

    // setChartData({ labels: rpsArr, datasets: dataSetArray });
    const chartData: { labels: string[]; datasets: ChartDataSet[] } = {
        labels: rpsArr,
        datasets: dataSetArray,
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
