import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { CountryEntity } from "./country-entity"

@Entity({ name: "districts" })
export class DistrictEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    districtName: string

    @ManyToOne(() => CountryEntity)
    country: CountryEntity
}