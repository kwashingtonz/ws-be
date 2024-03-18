import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "countries" })
export class CountryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    countryName: string
}