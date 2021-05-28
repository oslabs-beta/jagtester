import { Request, Response, NextFunction, Application } from 'express';

function getMiddleware(app: Application) {
    let collectedData: {
        [key: string]: {
            reqId: string;
            reqRoute: string;
            middlewares: {
                fnName: string;
                elapsedTime: number;
            }[];
        };
    } = {};
    let isPrototypeChanged = false;

    enum Jagtestercommands {
        updateLayer,
        running,
        endTest,
        resetCollectedData,
    }

    const resetLayerPrototype = () => {
        app._router.stack[0].__proto__.handle_request =
            originalLayerHandleRequest;
        isPrototypeChanged = false;
    };

    const updateLayerPrototype = () => {
        app._router.stack[0].__proto__.handle_request = newLayerHandleRequest;
        isPrototypeChanged = true;
    };

    const originalLayerHandleRequest = function handle(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
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

    const newLayerHandleRequest = function handle(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const fn = this.handle;

        if (fn.length > 3) {
            // not a standard request handler
            return next();
        }

        try {
            const beforeFunctionCall = Date.now(),
                fnName = this.name,
                reqId = req.headers.jagtesterreqid
                    ? req.headers.jagtesterreqid.toString()
                    : undefined,
                reqRoute = req.url;

            // create a data object in the collected data if it doesnt already exist
            if (!collectedData[reqId] && reqId) {
                collectedData[reqId] = {
                    reqId,
                    reqRoute,
                    middlewares: [],
                };
            }

            if (reqId) {
                // add layer information to the collectedData
                collectedData[reqId].middlewares.push({
                    fnName,
                    elapsedTime: 0,
                });
            }

            // call the middleware and time it in the next function
            fn(req, res, function () {
                if (reqId) {
                    const lastElIndex =
                        collectedData[reqId].middlewares.length - 1;
                    collectedData[reqId].middlewares[lastElIndex].elapsedTime =
                        Date.now() - beforeFunctionCall;
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
                return res.sendStatus(200);

            //reset the prototype and send back json data
            case Jagtestercommands.endTest:
                const copiedData = JSON.parse(JSON.stringify(collectedData));
                isPrototypeChanged && resetLayerPrototype();
                return res.json(copiedData);

            //reset the colleceted data
            case Jagtestercommands.resetCollectedData:
                collectedData = {};
                break;

            default:
                // changing layer prototype back to original
                if (isPrototypeChanged) {
                    resetLayerPrototype();
                }
                break;
        }

        return next();
    };
}

module.exports = getMiddleware;
