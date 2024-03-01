import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from 'src/common/dto/user';
import { AppErrors } from 'src/common/errors';
import * as bcrypt from 'bcrypt';
import { USER_PRIVATE_FIELDS, USER_SELECT_FIELDS } from 'src/common/constans';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async createUser(dto: CreateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (user) {
        return new BadRequestException(AppErrors.USER_EXISTS);
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      return this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hashedPassword,
        },
        select: {
          ...USER_SELECT_FIELDS,
        },
      });
    } catch (error) {}
  }

  public async getPublicUser(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
      select: {
        ...USER_SELECT_FIELDS,
      },
    });
  }

  public async getPrivateUser(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
      select: {
        ...USER_PRIVATE_FIELDS,
      },
    });
  }
}
