import express from "express";
const router = express.Router();
import {booksController, schedulesController} from "./DI"
import {bodyValidator, queryStringValidator, urlPathValidator} from "../validator/httpRequestValidator";
import Joi from "joi";

router.get("/books/:genre", [urlPathValidator({genre: Joi.string().required()}), queryStringValidator({
    limit: Joi.number().min(1).default(10),
    page: Joi.number().min(1).default(1),
})], booksController.getBookByGenre)

router.get("/schedule", schedulesController.getSchedule)

router.post("/schedule", bodyValidator({
    bookKey: Joi.string().required(),
    pickupTime: Joi.date().timestamp().required()
}), schedulesController.addSchedule)

module.exports = router;
