import { Request, Response, NextFunction, Application } from 'express';
import responseTime from 'response-time';

type FunctionType = (
	app: Application
) => (req: Request, res: Response, next: NextFunction) => unknown;

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

enum Jagtestercommands {
	updateLayer,
	running,
	endTest,
}

const getMiddleware: FunctionType = (app: Application) => {
	let collectedData: CollectedData = {};
	let routeData: RouteData = {};
	let isPrototypeChanged = false;

	const resetLayerPrototype = () => {
		app._router.stack[0].__proto__.handle_request = originalLayerHandleRequest;
		isPrototypeChanged = false;
		collectedData = {};
		routeData = {};
	};

	const updateLayerPrototype = () => {
		app._router.stack[0].__proto__.handle_request = newLayerHandleRequest;
		isPrototypeChanged = true;
		collectedData = {};
		routeData = {};
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

	const newLayerHandleRequest = function handle(req: Request, res: Response, next: NextFunction) {
		const fn = this.handle;

		if (fn.length > 3) {
			// not a standard request handler
			return next();
		}

		try {
			const fnName = this.name,
				reqId = req.headers.jagtesterreqid
					? req.headers.jagtesterreqid.toString()
					: undefined,
				reqRoute = req.originalUrl;

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
				if (reqId && routeData[reqRoute] && routeData[reqRoute][reqId]) {
					const lastElIndex = routeData[reqRoute][reqId].middlewares.length - 1;
					routeData[reqRoute][reqId].middlewares[lastElIndex].elapsedTime =
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
				// res.header({ jagtesterRoute: req.url });
				break;

			//changing the prototype of the layer handle request
			case Jagtestercommands.updateLayer:
				updateLayerPrototype();
				// res.header({ jagtesterRoute: req.url });
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
export default getMiddleware;
module.exports = getMiddleware;
