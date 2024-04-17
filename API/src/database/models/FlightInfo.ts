import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany } from "sequelize-typescript";
import Flight from "./Flight";

@Table({
    timestamps: true,
    tableName: 'flightInfo',
    modelName: 'FlightInfo',
})
class FlightInfo extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.FLOAT,
    })
    declare carbonEmissions: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare price: number;

    @Column({
        type: DataType.STRING,
    })
    declare currency: string;

    @Column({
        type: DataType.STRING,
    })
    declare airlineLogo: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @HasMany(() => Flight)
    declare flights: Flight[];
}

export default FlightInfo;