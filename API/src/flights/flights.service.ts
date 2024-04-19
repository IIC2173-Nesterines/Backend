import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import sequelize from '../db/config';

@Injectable()
export class FlightsService {
  async create(createFlightDto: CreateFlightDto) {
    console.log(createFlightDto);
    let departureAirport = await sequelize.models.Airport.findByPk(
      createFlightDto.flights[0].departure_airport.id,
    );
    if (!departureAirport) {
      departureAirport = await CreateAirPort(
        createFlightDto.flights[0].departure_airport.id,
        createFlightDto.flights[0].departure_airport.name,
      );
    }
    const arrivalAirport = await sequelize.models.Airport.findByPk(
      createFlightDto.flights[0].arrival_airport.id,
    );

    if (!arrivalAirport) {
      await CreateAirPort(
        createFlightDto.flights[0].arrival_airport.id,
        createFlightDto.flights[0].arrival_airport.name,
      );
    }
    const flight_data = {
      departureAirportId: createFlightDto.flights[0].departure_airport.id,
      departureDate: createFlightDto.flights[0].departure_airport.time,
      arrivalAirportId: createFlightDto.flights[0].arrival_airport.id,
      arrivalDate: createFlightDto.flights[0].arrival_airport.time,
      duration: createFlightDto.flights[0].duration,
      airplane: createFlightDto.flights[0].airplane,
      airline: createFlightDto.flights[0].airline,
      price: createFlightDto.price,
      carbonEmission: createFlightDto.carbonEmission.this_flight,
      airlineLogo: createFlightDto.airlineLogo,
      currency: createFlightDto.currency,
      quantity: 90,
    };
    console.log(flight_data);
    const flight = sequelize.models.Flight.create(flight_data);
    return flight;
  }

  async findAll() {
    return sequelize.models.Flight.findAll();
  }

  async findOne(id: number) {
    return sequelize.models.Flight.findByPk(id);
  }

  update(id: number, updateFlightDto: UpdateFlightDto) {
    console.log(updateFlightDto);
    const flight = sequelize.models.Flight.update(updateFlightDto, {
      where: {
        id: id,
      },
    });
    return flight;
  }

  remove(id: number) {
    return sequelize.models.Flight.destroy({
      where: {
        id: id,
      },
    });
  }
}
async function CreateAirPort(id: string, name: string) {
  return await sequelize.models.Airport.create({
    id: id,
    name: name,
  });
}
