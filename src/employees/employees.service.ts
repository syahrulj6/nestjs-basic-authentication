import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    const trimmedName = createEmployeeDto.name.toString().trim();

    if (!trimmedName) throw new BadRequestException('Name cannot be empty.');

    const newUser = {
      name: trimmedName,
      ...createEmployeeDto,
    };

    return this.databaseService.employee.create({
      data: newUser,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }

    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    const trimmedName = updateEmployeeDto.name.toString().trim();

    if (!trimmedName) throw new BadRequestException('Name cannot be empty.');

    const updatedUser = {
      name: trimmedName,
      ...updateEmployeeDto,
    };

    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
