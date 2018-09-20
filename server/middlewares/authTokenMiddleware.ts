import { Request, Response, NextFunction } from "express";
import * as moment from "moment";

export const authTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.cookies.authToken;
    if (authToken) {
        res.cookie("authToken", authToken, { maxAge: moment.duration(1, "day").asMilliseconds() });
    }

    next();
};