import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import sequelize from '../db/config';

@Injectable()
export class TicketsService {
  create(createTicketDto: CreateTicketDto) {
    console.log('createTicketDto', createTicketDto);
    return 'This action adds a new ticket';
  }

  findAll() {
    return `This action returns all tickets`;
  }

  async findBySessionId(sessionId: string) {
    console.log('sessionId', sessionId);
    const user = await sequelize.models.Users.findOne({
      where: {
        sessionId: sessionId,
      },
    });
    if (!user) {
      return 'User not found';
    }
    return sequelize.models.Tickets.findAll({
      where: {
        userId: user.dataValues.id,
      },
      include: [
        {
          model: sequelize.models.Flight,
          as: 'flight',
        },
      ],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    console.log('updateTicketDto', updateTicketDto);
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
