import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createPostDto: Prisma.PostCreateInput) {
    const trimmedTitle = createPostDto.title.toString().trim();

    if (!trimmedTitle) throw new BadRequestException('Title cannot be empty.');

    const newPost = {
      name: trimmedTitle,
      ...createPostDto,
    };

    return this.databaseService.post.create({
      data: newPost,
    });
  }

  async findAll() {
    return this.databaseService.post.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.post.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.PostUpdateInput) {
    const trimmedTitle = updateUserDto.title.toString().trim();

    if (!trimmedTitle) throw new BadRequestException('Name cannot be empty.');

    const updatedPost = {
      name: trimmedTitle,
      ...updateUserDto,
    };

    return this.databaseService.post.update({
      where: {
        id,
      },
      data: updatedPost,
    });
  }

  async remove(id: number) {
    return this.databaseService.post.delete({
      where: {
        id,
      },
    });
  }
}
