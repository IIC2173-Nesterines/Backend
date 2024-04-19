import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import sequelize from '../db/config';

@Injectable()
export class UsersService {
  create(createUserDto) {
    return sequelize.models.Users.create(createUserDto);
  }

  findAll() {
    return sequelize.models.Users.findAll();
  }

  async findOne(id: string) {
    return await sequelize.models.Users.findOne({ where: { sessionId: id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return sequelize.models.Users.update(updateUserDto, {
      where: {
        sessionId: id,
      },
    });
  }

  remove(id: string) {
    return sequelize.models.Users.destroy({
      where: {
        sessionId: id,
      },
    });
  }
}
