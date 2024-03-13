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
}