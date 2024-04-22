import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import sequelize from '../db/config';

@Injectable()
export class TicketsService {
  create(createTicketDto: CreateTicketDto) {
    return 'This action adds a new ticket';
  }

  findAll() {
    return `This action returns all tickets`;
  }

  async findBySessionId(sessionId: string) {
    const user = await sequelize.models.User.findOne({
      where: {
        sessionId: sessionId,
      },
    });
    if (!user) {
      return 'User not found';
    }
    return sequelize.models.Ticket.findAll({
      where: {
        userId: user.dataValues.id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
