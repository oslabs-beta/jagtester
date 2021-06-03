import { Request, Response, NextFunction, Application } from 'express';
import responseTime from 'response-time';

type FunctionType = (app: Application) => (req: Request, res: Response, next: NextFunction) => unknown;

const getMiddleware: FunctionType = (app: Application) => {
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

    interface RouteData {
        [key: string]: CollectedData;
    }

    let collectedData: CollectedData = {};
    const routeData: RouteData = {};
    let isPrototypeChanged = false;

    enum Jagtestercommands {
        updateLayer,
        running,
        endTest,
    }

    const resetLayerPrototype = () => {
        app._router.stack[0].__proto__.handle_request = originalLayerHandleRequest;
        isPrototypeChanged = false;
        collectedData = {};
    };

    const updateLayerPrototype = () => {
        app._router.stack[0].__proto__.handle_request = newLayerHandleRequest;
        isPrototypeChanged = true;
        collectedData = {};
    };

    const originalLayerHandleRequest = function handle(req: Request, res: Response, next: NextFunction) {
        const fn = this.handle;

        if (fn.length > 3) {
            // not a standard request handler
            return next();
        }

        try {
            fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };

    const newLayerHandleRequest = function handle(req: Request, res: Response, next: NextFunction) {
        const fn = this.handle;

        if (fn.length > 3) {
            // not a standard request handler
            return next();
        }

        try {
            const fnName = this.name,
                reqId = req.headers.jagtesterreqid ? req.headers.jagtesterreqid.toString() : undefined,
                reqRoute = req.url;

            // create a data object in the collected data if it doesnt already exist
            if (!routeData[reqRoute]) {
                const newCollectedData: CollectedData = {};
                newCollectedData[reqId] = {
                    reqId,
                    reqRoute,
                    middlewares: [],
                };
                routeData[reqRoute] = newCollectedData;
            } else {
                // create a data object in the collected data if it doesnt already exist
                if (reqId && !routeData[reqRoute][reqId]) {
                    routeData[reqRoute][reqId] = {
                        reqId,
                        reqRoute,
                        middlewares: [],
                    };
                }
            }

            // create a data object in the collected data if it doesnt already exist
            if (reqId && !collectedData[reqId]) {
                collectedData[reqId] = {
                    reqId,
                    reqRoute,
                    middlewares: [],
                };
            }

            if (reqId) {
                // add layer information to the collectedData
                routeData[reqRoute][reqId].middlewares.push({
                    fnName,
                    elapsedTime: 0,
                });

                collectedData[reqId].middlewares.push({
                    fnName,
                    elapsedTime: 0,
                });
            }

            // call the middleware and time it in the next function
            const beforeFunctionCall = Date.now();
            fn(req, res, function () {
                if (reqId && routeData[reqRoute][reqId]) {
                    const lastElIndex = routeData[reqRoute][reqId].middlewares.length - 1;
                    routeData[reqRoute][reqId].middlewares[lastElIndex].elapsedTime = Date.now() - beforeFunctionCall;
                }
                next();
            });
        } catch (err) {
            next(err);
        }
    };

    // this is the actual middleware that will take jagtestercommands
    return (req: Request, res: Response, next: NextFunction) => {
        // getting the command
        const jagtestercommand = +req.headers.jagtestercommand;

        switch (jagtestercommand) {
            //changing the prototype of the layer handle request while running
            case Jagtestercommands.running:
                if (!isPrototypeChanged) {
                    updateLayerPrototype();
                }
                break;

            //changing the prototype of the layer handle request
            case Jagtestercommands.updateLayer:
                if (!isPrototypeChanged) {
                    updateLayerPrototype();
                }
                return res.json({ jagtester: true });

            //reset the prototype and send back json data
            case Jagtestercommands.endTest:
                res.json(routeData);
                resetLayerPrototype();
                return;

            default:
                // changing layer prototype back to original
                if (isPrototypeChanged) {
                    resetLayerPrototype();
                }
                break;
        }
        return responseTime({ suffix: false })(req, res, next);
    };
};
module.exports = getMiddleware;
