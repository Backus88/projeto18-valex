import { NextFunction, Request, Response } from "express";


export default function errorHandler (error: any, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  if (error.type === 'error_not_found') {
    return res.sendStatus(404);
  }

  res.sendStatus(500); 
}