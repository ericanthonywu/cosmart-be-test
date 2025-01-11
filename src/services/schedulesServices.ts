import SchedulesRepository from "../repository/schedulesRepository";
import Schedule from "../model/schedule.model";

export default class SchedulesServices {
    constructor(private _schedulesRepository: SchedulesRepository) {
    }

    public getSchedules = async (): Promise<Schedule[]> => {
        return this._schedulesRepository.findAll();
    }

    public addSchedule = async (schedule: Schedule) => {
        await this._schedulesRepository.addSchedule(schedule);
    }
}