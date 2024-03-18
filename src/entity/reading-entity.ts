import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { WeatherStationEntity } from "./weather-station-entity"

@Entity({ name: "readings" })
export class ReadingEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    dateTime: Date

    @Column()
    temperature: number

    @Column()
    humidity: number

    @Column()
    airPressure: number

    @ManyToOne(() => WeatherStationEntity)
    weatherStation: WeatherStationEntity
}