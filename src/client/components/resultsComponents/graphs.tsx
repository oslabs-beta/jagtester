import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


// const resultsData = require("../resultsData.json");
// const results = resultsData.results;



const StackedBar = ():JSX.Element => {
  const [chartData, setChartData] = useState({})
  
  // const labelsArr = [];
  // const dataSetArrs = {};

  //for each interval response, we will push an interval label into "labels"
  //then push each function time into dataset array
  //check if there is no dataset with the current function name, and create it
    
  //loop through the array of objs

  //obj.RPS - push into labels array

  //add in logic fro when the func name is duplicated
  //but still within the same interval 

  // results.forEach(obj => {
  //   labelsArr.push(obj.RPS)
  //   obj.middlewares.forEach(funcObj => {
  //     let func = funcObj.fnName;
  //     if(!dataSetArrs[func]){
  //       dataSetArrs[func] = [];
  
  //     }
  //     dataSetArrs[func].push(funcObj.elapsedTime)
  //   })
  // })

  
  
  const chart = () => {




    setChartData({
      labels: ['interval1', 'interval2'],
      datasets: [
        {
          label: 'function1',
          data: [0.1, 10],
          backgroundColor: [
            'rgba(74, 178, 152, 0.91)'
          ],
          borderWidth: 0
        },
        {
          label: 'function2',
          data: [10, 5],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)'
          ],
          borderWidth: 0
        },
        {
          label: 'function3',
          data: [20, 10],
          backgroundColor: [
            'rgba(69, 255, 209, 0.59)'
          ],
          borderWidth: 0
        }
      ]
    })
  }
  useEffect(() => {
    chart()
  },[])

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'JAGtester Results'
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: false
      }
    }
  }

  return(
    <div className="Chart">
      <div>
        <Bar type="bar" data={chartData} options= {chartOptions}/>
      </div>
    </div>
  )
}





const testData : {
  reqId: string;
  reqRoute: string;
  middlewares: {
      fnName: string;
      elapsedTime: number;
  }[];
  recordedTime: number;
  receivedTime: number;
  errorCount: number;
  successfulResCount: number;
  requestCount: number;
  RPS: number;
}[] = [
  {
      reqId: "0",
      reqRoute: "/testroute",
      middlewares: [
          {
              fnName: "query",
              elapsedTime: 0.01
          },
          {
              fnName: "expressInit",
              elapsedTime: 0.01
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.01
          },
          {
              fnName: "urlencodedParser",
              elapsedTime: 0
          },
          {
              fnName: "jsonParser",
              elapsedTime: 0
          },
          {
              fnName: "_cookieSession",
              elapsedTime: 0.03
          },
          {
              fnName: "serveStatic",
              elapsedTime: 0.3
          },
          {
              fnName: "corsMiddleware",
              elapsedTime: 0.02
          },
          {
              fnName: "initialize",
              elapsedTime: 0.01
          },
          {
              fnName: "authenticate",
              elapsedTime: 0.01
          },
          {
              fnName: "bound dispatch",
              elapsedTime: 0
          },
          {
              fnName: "first",
              elapsedTime: 200.14
          },
          {
              fnName: "second",
              elapsedTime: 100.37
          },
          {
              fnName: "third",
              elapsedTime: 50.41
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.16
          }
      ],
      recordedTime: 352.67,
      receivedTime: 351.48,
      errorCount: 0,
      successfulResCount: 1500,
      requestCount: 1500,
      RPS: 500
  },
  {
      reqId: "0",
      reqRoute: "/testroute",
      middlewares: [
          {
              fnName: "query",
              elapsedTime: 0
          },
          {
              fnName: "expressInit",
              elapsedTime: 0.01
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.01
          },
          {
              fnName: "urlencodedParser",
              elapsedTime: 0
          },
          {
              fnName: "jsonParser",
              elapsedTime: 0
          },
          {
              fnName: "_cookieSession",
              elapsedTime: 0.02
          },
          {
              fnName: "serveStatic",
              elapsedTime: 0.46
          },
          {
              fnName: "corsMiddleware",
              elapsedTime: 0.01
          },
          {
              fnName: "initialize",
              elapsedTime: 0.01
          },
          {
              fnName: "authenticate",
              elapsedTime: 0
          },
          {
              fnName: "bound dispatch",
              elapsedTime: 0
          },
          {
              fnName: "first",
              elapsedTime: 200.43
          },
          {
              fnName: "second",
              elapsedTime: 100.53
          },
          {
              fnName: "third",
              elapsedTime: 50.81
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.04
          }
      ],
      recordedTime: 354.44,
      receivedTime: 352.33,
      errorCount: 0,
      successfulResCount: 4500,
      requestCount: 4500,
      RPS: 1500
  },
  {
      reqId: "0",
      reqRoute: "/testroute",
      middlewares: [
          {
              fnName: "query",
              elapsedTime: 0
          },
          {
              fnName: "expressInit",
              elapsedTime: 0.01
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.01
          },
          {
              fnName: "urlencodedParser",
              elapsedTime: 0
          },
          {
              fnName: "jsonParser",
              elapsedTime: 0
          },
          {
              fnName: "_cookieSession",
              elapsedTime: 0.02
          },
          {
              fnName: "serveStatic",
              elapsedTime: 5.74
          },
          {
              fnName: "corsMiddleware",
              elapsedTime: 0.01
          },
          {
              fnName: "initialize",
              elapsedTime: 0.01
          },
          {
              fnName: "authenticate",
              elapsedTime: 0
          },
          {
              fnName: "bound dispatch",
              elapsedTime: 0
          },
          {
              fnName: "first",
              elapsedTime: 204.74
          },
          {
              fnName: "second",
              elapsedTime: 104.45
          },
          {
              fnName: "third",
              elapsedTime: 58.09
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.04
          }
      ],
      recordedTime: 389.38,
      receivedTime: 373.12,
      errorCount: 0,
      successfulResCount: 7500,
      requestCount: 7500,
      RPS: 2500
  },
  {
      reqId: "0",
      reqRoute: "/testroute",
      middlewares: [
          {
              fnName: "query",
              elapsedTime: 0
          },
          {
              fnName: "expressInit",
              elapsedTime: 0.01
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.01
          },
          {
              fnName: "urlencodedParser",
              elapsedTime: 0
          },
          {
              fnName: "jsonParser",
              elapsedTime: 0
          },
          {
              fnName: "_cookieSession",
              elapsedTime: 0.02
          },
          {
              fnName: "serveStatic",
              elapsedTime: 59.62
          },
          {
              fnName: "corsMiddleware",
              elapsedTime: 0.01
          },
          {
              fnName: "initialize",
              elapsedTime: 0.01
          },
          {
              fnName: "authenticate",
              elapsedTime: 0
          },
          {
              fnName: "bound dispatch",
              elapsedTime: 0
          },
          {
              fnName: "first",
              elapsedTime: 257.22
          },
          {
              fnName: "second",
              elapsedTime: 186.02
          },
          {
              fnName: "third",
              elapsedTime: 115.8
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.03
          }
      ],
      recordedTime: 804.83,
      receivedTime: 618.75,
      errorCount: 430,
      successfulResCount: 10070,
      requestCount: 10500,
      RPS: 3500
  },
  {
      reqId: "0",
      reqRoute: "/testroute",
      middlewares: [
          {
              fnName: "query",
              elapsedTime: 0
          },
          {
              fnName: "expressInit",
              elapsedTime: 0.01
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.01
          },
          {
              fnName: "urlencodedParser",
              elapsedTime: 0.01
          },
          {
              fnName: "jsonParser",
              elapsedTime: 0
          },
          {
              fnName: "_cookieSession",
              elapsedTime: 0.02
          },
          {
              fnName: "serveStatic",
              elapsedTime: 59.29
          },
          {
              fnName: "corsMiddleware",
              elapsedTime: 0.01
          },
          {
              fnName: "initialize",
              elapsedTime: 0.01
          },
          {
              fnName: "authenticate",
              elapsedTime: 0
          },
          {
              fnName: "bound dispatch",
              elapsedTime: 0
          },
          {
              fnName: "first",
              elapsedTime: 250.47
          },
          {
              fnName: "second",
              elapsedTime: 165.65
          },
          {
              fnName: "third",
              elapsedTime: 116.75
          },
          {
              fnName: "<anonymous>",
              elapsedTime: 0.04
          }
      ],
      recordedTime: 1443.25,
      receivedTime: 592.27,
      errorCount: 5686,
      successfulResCount: 7814,
      requestCount: 13500,
      RPS: 4500
  }
  ]
export default StackedBar;




