import { DayEvent as EventModel } from "../utils/types";

export class DayModel {

    date: Date;
    events: EventModel[] = [];

    constructor(date: Date, events: EventModel[] = []) {
        this.date = date;
        this.events = events;
    }
}