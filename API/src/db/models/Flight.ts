import { Table, Column, Model, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import Airport from './Airport';
import Request from './Request';

@Table({
    timestamps: true,
    tableName: 'flights',
    modelName: 'Flight'
})
class Flight extends Model {
    @ForeignKey(() => Airport)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare departureAirportId: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare departureDate: Date;

    @ForeignKey(() => Airport)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare arrivalAirportId: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare arrivalDate: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare duration: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare airplane: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare airline: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare airlineLogo: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare carbonEmissions: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare price: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare currency: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare quantity: number;

    @HasMany(() => Request)
    declare requests: Request[];
}

export default Flight;