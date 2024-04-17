import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'airports',
    modelName: 'Airport'
})
class Airport extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;
}

export default Airport;