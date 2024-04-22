import { Injectable } from '@nestjs/common';
import {
  CreateRequestDto,
  CreateGroupRequestDto,
} from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import sequelize from '../db/config';
import { v4 as uuidv4 } from 'uuid';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class RequestsService {
  constructor(private mqttService: MqttService) {}
  async create(createRequestDto: CreateRequestDto) {
    console.log('CreateRequestDto', createRequestDto);
    // const flight = await sequelize.models.Flight.findOne({
    //   where: {
    //     departureAirportId: createRequestDto.departure_airport,
    //     arrivalAirportId: createRequestDto.arrival_airport,
    //     departureDate: createRequestDto.departure_time,
    //   },
    // });
    const flight = await sequelize.models.Flight.findByPk(
      createRequestDto.flight_id,
    );
    if (!flight) {
      return 'Flight not found';
    }
    console.log('flight', flight);
    const user = await sequelize.models.Users.findOne({
      where: {
        sessionId: createRequestDto.session_id,
      },
    });
    const date = new Date(createRequestDto.datetime);
    const request_data = {
      userId: user.dataValues.id,
      flightId: flight.dataValues.id,
      date: date,
      // datetime: createRequestDto.datetime,
      state: 'pending',
      quantity: createRequestDto.quantity,
      request_id: uuidv4(),
    };
    if (flight.dataValues.quantity < createRequestDto.quantity) {
      return 'Not enough tickets';
    }
    const request = await sequelize.models.Request.create(request_data);
    // console.log('request', request);
    const data = {
      request_id: request.dataValues.request_id,
      group_id: '10',
      departure_airport: flight.dataValues.departureAirportId,
      datetime: flight.dataValues.departureDate,
      departure_time: flight.dataValues.departureDate,
      deposit_token: '',
      seller: 0,
      quantity: request.dataValues.quantity,
    };
    console.log('data', data);
    this.mqttService.publishMessage(
      process.env.MQTT_CHANNEL,
      JSON.stringify(data),
    );
    return request;
  }

  async createGroup(createGroupRequestDto: CreateGroupRequestDto) {
    try {
      console.log('CreateRequestDto', createGroupRequestDto);
      // const airports = await sequelize.models.Airport.findAll();
      // console.log('AIRPORTS: ', airports);
      const departure_time = new Date(createGroupRequestDto.departure_time);
      const departure_airport = await sequelize.models.Airport.findOne({
        where: {
          id: createGroupRequestDto.departure_airport,
        },
      });

      const arrival_airport = await sequelize.models.Airport.findOne({
        where: {
          id: createGroupRequestDto.arrival_airport,
        },
      });
      // console.log('departure_airport', departure_airport);
      // console.log('arrival_airport', arrival_airport);
      const flight = await sequelize.models.Flight.findOne({
        where: {
          departureAirportId: departure_airport.dataValues.id,
          arrivalAirportId: arrival_airport.dataValues.id,
          // departureDate: departure_time,
        },
      });
      // console.log('flight', flight);
      if (!flight) {
        return 'Flight not found';
      }

      let groupUser = await sequelize.models.Users.findOne({
        where: {
          sessionId: '000000000000000000' + createGroupRequestDto.group_id,
        },
      });

      if (!groupUser) {
        groupUser = await sequelize.models.Users.create({
          email: createGroupRequestDto.group_id + '@group.com',
          username: createGroupRequestDto.group_id,
          sessionId: '000000000000000000' + createGroupRequestDto.group_id,
        });
      }

      const request_data = {
        userId: groupUser.dataValues.id,
        flightId: flight.dataValues.id,
        date: createGroupRequestDto.datetime,
        state: 'pending',
        quantity: createGroupRequestDto.quantity,
        request_id: createGroupRequestDto.request_id,
      };
      if (flight.dataValues.quantity < createGroupRequestDto.quantity) {
        return 'Not enough tickets';
      }
      const request = await sequelize.models.Request.create(request_data);
      console.log('request', request);
      return request;
    } catch (err) {
      console.log('Error', err);
      return err;
    }
  }
  findAll() {
    return sequelize.models.Request.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    console.log('updateRequestDto', updateRequestDto);
    return `This action updates a #${id} request`;
  }
  async update_state(updateRequestDto: UpdateRequestDto) {
    console.log('updateRequestDto', updateRequestDto);
    const request = await sequelize.models.Request.findOne({
      where: {
        request_id: updateRequestDto.request_id,
      },
    });
    if (!request) {
      return 'Request not found';
    }
    request.update({
      state: updateRequestDto.state,
    });
    if (updateRequestDto.state === 'approved') {
      const flight = await sequelize.models.Flight.findOne({
        where: {
          id: request.dataValues.flightId,
        },
      });
      if (!flight) {
        return 'Flight not found';
      }
      flight.update({
        quantity: flight.dataValues.quantity - request.dataValues.quantity,
      });
      await sequelize.models.Tickets.create({
        userId: request.dataValues.userId,
        flightId: request.dataValues.flightId,
        quantity: request.dataValues.quantity,
      });
      // console.log('ticket', ticket);
    }
    console.log('Ticket updates successfully');
    return request;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
