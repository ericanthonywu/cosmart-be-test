import SchedulesServices from '../services/schedulesServices';
import SchedulesRepository from '../repository/schedulesRepository';
import Schedule from '../model/schedule.model';

describe('SchedulesServices', () => {
    let schedulesRepositoryMock: jest.Mocked<SchedulesRepository>;
    let schedulesServices: SchedulesServices;

    beforeEach(() => {
        schedulesRepositoryMock = {
            findAll: jest.fn(),
            addSchedule: jest.fn(),
        } as unknown as jest.Mocked<SchedulesRepository>;

        schedulesServices = new SchedulesServices(schedulesRepositoryMock);
    });

    describe('getSchedules', () => {
        it('should call findAll on the repository and return the schedules', async () => {
            const mockSchedules: Schedule[] = [
                { bookKey: 'Book 1', pickupTime: '2025-01-11' },
                { bookKey: 'Book 2', pickupTime: '2025-01-12' },
            ];
            schedulesRepositoryMock.findAll.mockResolvedValue(mockSchedules);

            const result = await schedulesServices.getSchedules();

            expect(schedulesRepositoryMock.findAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockSchedules);
        });
    });

    describe('addSchedule', () => {
        it('should call addSchedule on the repository with the given schedule', async () => {
            const newSchedule: Schedule = { bookKey: 'Book 3', pickupTime: '2025-01-13' };

            await schedulesServices.addSchedule(newSchedule);

            expect(schedulesRepositoryMock.addSchedule).toHaveBeenCalledTimes(1);
            expect(schedulesRepositoryMock.addSchedule).toHaveBeenCalledWith(newSchedule);
        });
    });
});
