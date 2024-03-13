import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"
import { DistrictEntity } from "./district-entity"

@Entity()
export class CountyEntity {
    @ObjectIdColumn()
    id: ObjectId

    @Column()
    countryId: number

    @Column()
    countryName: string

    @Column((type) => DistrictEntity)
    districts: DistrictEntity[]
}
