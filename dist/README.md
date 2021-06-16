# Jagtester

[![npm version](https://badge.fury.io/js/jagtester.svg)](https://badge.fury.io/js/jagtester)

[Jagtester](https://jagtester.com/) is an NPM package that you can install in your Express based server to test the performance of it. How does it work? Jagtester will spin up on a local host that is available. We have implemented logic that will check which local host is still available. Now the fun stuff, add in the configurations youwould like to test out and get your results! The test can be customized to multiple routes, percentage of load per route, request amount and the frequency of the requests. Run as many tests as you want, and then view results on the results page. The results will be displayed in exportable graphs and tables. Data is broken down to show the total time for all routes and the error percentage and views for route specific data where you can analyze the data down to the middleware level.

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

```bash
const jagtester = require('jagtester');
app.use(jagtester(app));
```

Now just run the Jagtester with

```bash
npx jagtester
```

and it will start up jagtester on a local server port 15000 (or next available port).

With our intuitive web interface, you will ba able to configure the test and run it.

## Building

If you want to build Jagtester yourself, ensure that you have [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) installed.

Clone a copy of the repo:

```bash
git clone https://github.com/oslabs-beta/jagtester.git
```

Change to the Jagtester directory:

```bash
cd jagtester
```

Install tools and dependencies:

```bash
npm install
```

Make sure you have installed global dev dependencies:

```bash
npm install -g typescript webpack
```

Build

```bash
npm run build
```

## Features

-   Allows users to completely configure testing based on the needs of their application
-   Stop feature, which will allow the user to stop the current test at any point and get the results that have been generated so far
-   The ability to hit reset and clear all configurations.oDisplays graphs to show a breakdown of all routes along with the error percentage
-   As well as a graph to display each route, broken down to the middleware level to analyze performance of eachmiddleware.
-   Export functionality to generate result reports.oDark mode/ light mode options!

## We are open to any issues!
