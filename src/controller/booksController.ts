import OpenLibraryServices from "../services/openLibraryServices";
import express from "express";
import StatusCodeConstant from "../constant/statusCodeConstant";
import ResponseUtil from "../util/responseUtil";

export default class BooksController {
    constructor(private _openLibraryService: OpenLibraryServices) {
    }

    public getBookByGenre = async (req: express.Request<{genre: string}, null, null, {limit: number, page: number}>, res: express.Response, next: express.NextFunction)=> {
        try {
            const {genre} = req.params

            const {limit, page} = req.query;
            const data = await this._openLibraryService.getOpenLibrary(genre, limit, page)

            res.status(StatusCodeConstant.OK).json(new ResponseUtil().setData(data).toObject())
        } catch (e) {
            next(e);
        }
    }
}