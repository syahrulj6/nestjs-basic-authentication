import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Ip,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  private readonly logger = new MyLoggerService(ProfileController.name);

  @Post()
  create(@Body() createProfileDto: Prisma.ProfileCreateInput) {
    return this.profileService.create(createProfileDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string) {
    this.logger.log(`Request for all Profile\t${ip}`);
    return this.profileService.findAll();
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: Prisma.PostUpdateInput,
  ) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
