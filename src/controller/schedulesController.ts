import SchedulesServices from "../services/schedulesServices";
import express from "express";
import ResponseUtil from "../util/responseUtil";
import StatusCodeConstant from "../constant/statusCodeConstant";

export default class SchedulesController {
    constructor(private _schedulesServices: SchedulesServices) {
        this._schedulesServices = _schedulesServices;
    }

    public getSchedule = async (_req: express.Request, res: express.Response, next: express.NextFunction)  => {
        try {
            const data = await this._schedulesServices.getSchedules()

            res.status(StatusCodeConstant.OK).json(new ResponseUtil().setData(data).toObject())
        } catch (e) {
            next(e);
        }
    }

    public addSchedule = async (req: express.Request, res: express.Response, next: express.NextFunction)  => {
        try {
            const { bookKey, pickupTime } = req.body;

            await this._schedulesServices.addSchedule({ bookKey, pickupTime })

            res.status(StatusCodeConstant.CREATED).json(new ResponseUtil().toObject())
        } catch (e) {
            next(e);
        }
    }
}