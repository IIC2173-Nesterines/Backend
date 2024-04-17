import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey, HasOne } from 'sequelize-typescript';
import FlightInfo from './FlightInfo';
import Airport from './Airport';

@Table({
    timestamps: true,
    tableName: 'flights',
    modelName: 'Flight',
})
class Flight extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    declare id: number;

    // FlightInfo Relation
    @ForeignKey(() => FlightInfo)
    @Column({
        type: DataType.INTEGER,
    })
    declare flightInfoId: number;

    // Airport Relation
    @ForeignKey(() => Airport)
    @Column({
        type: DataType.STRING,
    })
    declare departureAirportId: string;

    @Column({
        type: DataType.DATE,
    })
    declare departureDate: Date;

    @ForeignKey(() => Airport)
    @Column({
        type: DataType.STRING,
    })
    declare arrivalAirportId: string;

    @Column({
        type: DataType.DATE,
    })
    declare arrivalDate: Date;

    // Atrributes
    @Column({
        type: DataType.STRING,
    })
    declare airplane: string;

    @Column({
        type: DataType.STRING,
    })
    declare airlineLogo: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

}

export default Flight;