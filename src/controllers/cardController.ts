import { Request, Response } from "express";
import * as cardServices from '../services/cardServices'


export async function cardCreation(req: Request, res: Response){
    let newKey = '';
    if(req.headers["x-api-key"] !== undefined){
        newKey =  req.headers["x-api-key"].toString();
    }
    console.log( typeof newKey);
    const teste = await cardServices.containsApiKey(newKey);
    res.send(teste).status(200);
}