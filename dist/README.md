# Jagtester

[![npm version](https://badge.fury.io/js/jagtester.svg)](https://badge.fury.io/js/jagtester)

There is a big community of developers using Express JS with Node.js to power their web applications. Our team of developers love the simplicity of Express and have used it numerous times in our applications. But, as developers who like to optimize the performance of our application, we wanted to test the performance of the server under heavy load, so we started looking around for solutions. Sure, there are a lot of products that can help developers test the performance of the server, but we wanted to go much deeper. What if we could show how each middleware within the server performs before sending out the response? What if we wanted to compare how the performance scales based on the requests per second? We couldn’t find the product we needed, so we did what every great developer team does, we created our own solution.
Enter [Jagtester](https://jagtester.com/).

## Installing

For npm:

```bash
npm install jagtester
```

or yarn:

```bash
yarn add jagtester
```

## Usage

It is very easy to use jagtester, just install it and include it as a middleware in your Express server, and you are ready to go.

```JavaScript
const jagtester = require('jagtester');
app.use(jagtester(app));
```

**NOTE: you need to pass your Express app to jagtester middleware, so it can enable middleware level reporting**

**NOTE: Make sure to put the Jagtester above all other global middlewares (for ex. express.static()), because the test will not be able to start if other middlewares are sending a response before the request can hit the jagtester middleware.**

Now just run the Jagtester with

```bash
npx jagtester
```

and it will start up jagtester on a local server port 15000 (or next available port).

With our intuitive web interface, you will ba able to configure the test and run it. Make sure to also start your own server you want to use Jagtester on.

## Features

-   Allows users to fully customize testing based on the needs of their application. Here are the options you can configure:
    -   Requests per second (RPS) interval.
    -   Starting and ending RPS.
    -   Time to stay at each RPS range.
    -   Ability to simulate traffic to one or more targets, with a specified percentage of the load going to each target.
-   Stop feature, which will allow the user to stop the current test if it is taking too long and get the results that have been generated so far.
-   Displays graphs to show a breakdown of all routes along with the error percentage.
-   Graphs to display details for each route, broken down to the middleware level to analyze the performance of each of the routes.
-   Export functionality to generate result reports, either from all tests or only single test results, with an ability to delete the collected results.
-   And for the lover of dark mode, we got you covered with an option to switch between light and dark modes.

## We are open to any issues!
