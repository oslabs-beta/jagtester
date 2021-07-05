import { Request, Response, NextFunction, Application } from 'express';
declare type FunctionType = (app: Application) => (req: Request, res: Response, next: NextFunction) => unknown;
declare const getMiddleware: FunctionType;
export default getMiddleware;
