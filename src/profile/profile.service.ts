import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProfileService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProfileDto: Prisma.ProfileCreateInput) {
    const trimmedBio = createProfileDto.bio.toString().trim();

    if (!trimmedBio) throw new BadRequestException('Title cannot be empty.');

    const newProfile = {
      bio: trimmedBio,
      ...createProfileDto,
    };

    return this.databaseService.profile.create({
      data: newProfile,
    });
  }

  async findAll() {
    return this.databaseService.profile.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.profile.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.PostUpdateInput) {
    const trimmedBio = updateUserDto.title.toString().trim();

    if (!trimmedBio) throw new BadRequestException('Name cannot be empty.');

    const updatedPost = {
      bio: trimmedBio,
      ...updateUserDto,
    };

    return this.databaseService.profile.update({
      where: {
        id,
      },
      data: updatedPost,
    });
  }

  async remove(id: number) {
    return this.databaseService.profile.delete({
      where: {
        id,
      },
    });
  }
}
