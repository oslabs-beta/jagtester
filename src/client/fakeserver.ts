const main = (): void => {
    console.log('Entered main function');
    // TODO make sure user inputs http or https
    // TODO make sure the target has cors on
    // const testTargetURL = 'http://localhost:3000/testroute';
    // console.log(navigator.hardwareConcurrency);

    // const iWorkerCount = 20;

    // for (let i = 0; i < iWorkerCount; i++) {
    //     const oWorker = new Worker('/webapp/src/client/fakeserverworker.js');
    // }

    // const timeObj: { [key: string]: number } = {};
    // for (let i = 0; i < 10; i++) {
    //     timeObj[`key${i.toString()}`] = Date.now();
    //     fetch(testTargetURL)
    //         .then(() => {
    //             console.log(
    //                 `response from ${testTargetURL} received. Total time is ${
    //                     Date.now() - timeObj[`key${i.toString()}`]
    //                 }`
    //             );
    //         })
    //         .catch((err) => console.log(err));
    // }
};

export default main;
