import { Column } from "typeorm"

export class ReadingEntity {
    @Column()
    dateTime: Date

    @Column()
    temperature: number

    @Column()
    humidity: number

    @Column()
    airPressure: number

    constructor(dateTime: Date, temperature: number, humidity: number, airPressure: number) {
        this.dateTime = dateTime
        this.temperature = temperature
        this.humidity = humidity
        this.airPressure = airPressure
    }
}