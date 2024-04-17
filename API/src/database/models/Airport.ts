import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey } from "sequelize-typescript";
import Flight from "./Flight";

@Table({
    timestamps: true,
    tableName: 'airports',
    modelName: 'Airport',
})
class Airport extends Model {
    @Column({
        primaryKey: true,
        type: DataType.STRING,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

}

export default Airport;
