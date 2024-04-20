import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    const trimmedName = createUserDto.name.toString().trim();

    if (!trimmedName) throw new BadRequestException('Name cannot be empty.');

    const newUser = {
      name: trimmedName,
      ...createUserDto,
    };

    return this.databaseService.user.create({
      data: newUser,
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    const trimmedName = updateUserDto.name.toString().trim();

    if (!trimmedName) throw new BadRequestException('Name cannot be empty.');

    const updatedUser = {
      name: trimmedName,
      ...updateUserDto,
    };

    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
