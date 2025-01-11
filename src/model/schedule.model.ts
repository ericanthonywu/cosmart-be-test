export default class Schedule {
    constructor(public bookKey: string, public pickupTime: string | number) {
        this.bookKey = bookKey;
        this.pickupTime = pickupTime;
    }
}