import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto, LoginUserDto } from 'src/common/dto/user';
import { TokenService } from '../token/token.service';
import { AppErrors } from 'src/common/errors';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  public async registerUser(dto: CreateUserDto) {
    const result = await this.userService.createUser(dto);
    const payload = {
      name: dto.name,
      email: dto.email,
    };
    const token = await this.tokenService.generateJwtToken(payload);
    return { ...result, token };
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.userService.getPrivateUser(dto.email)
    if (!user) {
      return new BadRequestException(AppErrors.USER_NOT_EXISTS)
    }
    const checkPassword = await bcrypt.compare(dto.password, user.password) 
    if (!checkPassword) {
      return new BadRequestException(AppErrors.INVALID_PASSWORD)
    }
    delete user.password
    const payload = {
      email: user.email
    };
    const token = await this.tokenService.generateJwtToken(payload);
    return { ...user, token };
  }
}
