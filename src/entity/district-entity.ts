import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"
import { WeatherStationEntity } from "./weather-station-entity"

export class DistrictEntity {
    @Column()
    districtId: number

    @Column()
    districtName: string

    @Column((type) => WeatherStationEntity)
    weatherStations: WeatherStationEntity[]
}