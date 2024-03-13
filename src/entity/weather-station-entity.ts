import { Column } from "typeorm"
import { ReadingEntity } from "./reading-entity"

export class WeatherStationEntity {
    @Column()
    weatherStationId: number

    @Column()
    weatherStationName: string

    @Column((type) => ReadingEntity)
    readings: ReadingEntity[]
}