import Schedule from "../model/schedule.model";

export default class SchedulesRepository {
    private _data: Array<Schedule> = [];

    public async findAll(): Promise<Schedule[]> {
        return this._data;
    }

    public async addSchedule(schedule: Schedule): Promise<Schedule> {
        this._data.push(schedule);

        return schedule;
    }

    public async addSchedules(schedules: Schedule[]): Promise<Schedule[]> {
        for (const schedule of schedules) {
            this._data.push(schedule);
        }

        return schedules;
    }
}