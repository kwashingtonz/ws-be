import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { DistrictEntity } from "./district-entity"

@Entity({ name: "weather_stations" })
export class WeatherStationEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    weatherStationName: string

    @ManyToOne(() => DistrictEntity)
    district: DistrictEntity
}