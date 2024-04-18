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

  findOne(id: number) {
    return sequelize.models.Users.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return sequelize.models.Users.update(updateUserDto, {
      where: {
        id: id
      }
    });
  }

  remove(id: number) {
    return sequelize.models.Users.destroy({
      where: {
        id: id
      }
    });
  }
}
