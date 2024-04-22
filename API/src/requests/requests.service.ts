import { Injectable } from '@nestjs/common';
import {
  CreateRequestDto,
  CreateGroupRequestDto,
} from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import sequelize from '../db/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestsService {
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
    console.log('request', request);
    return request;
  }

  async createGroup(createGroupRequestDto: CreateGroupRequestDto) {
    console.log('CreateRequestDto', createGroupRequestDto);
    const date = new Date(createGroupRequestDto.datetime);
    console.log('date', date);
    const flight = await sequelize.models.Flight.findOne({
      where: {
        departureAirportId: createGroupRequestDto.departure_airport,
        arrivalAirportId: createGroupRequestDto.arrival_airport,
        // departureDate: date,
      },
    });
    console.log('flight', flight);
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
      const ticket = await sequelize.models.Tickets.create({
        userId: request.dataValues.userId,
        flightId: request.dataValues.flightId,
        quantity: request.dataValues.quantity,
      });
      console.log('ticket', ticket);
    }
    console.log('Ticket updates successfully');
    return request;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
