import SchedulesRepository from "../repository/schedulesRepository";
import SchedulesServices from "../services/schedulesServices";
import OpenLibraryServices from "../services/openLibraryServices";
import BooksController from "../controller/booksController";
import SchedulesController from "../controller/schedulesController";

// repository
const schedulesRepository = new SchedulesRepository()

// services
const schedulesService = new SchedulesServices(schedulesRepository);
const openLibraryServices = new OpenLibraryServices();

// controller
const booksController = new BooksController(openLibraryServices);
const schedulesController = new SchedulesController(schedulesService);

export {
    booksController,
    schedulesController,
}