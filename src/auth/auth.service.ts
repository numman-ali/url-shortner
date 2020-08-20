import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { mongoose } from '@typegoose/typegoose';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(email: string, password: string): Promise<void> {
    if (await this.usersService.alreadyExists(email)) {
      throw new HttpException('A user with this email already exists!', HttpStatus.CONFLICT)
    }
    await this.usersService.create(email, password);
  }

  async validateUser(email: string, password: string): Promise<{ email: string, _id: mongoose.Types.ObjectId } | null> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return { email: user.email, _id: user._id };
    }
    return null;
  }

  login(user: { email: string, _id: mongoose.Types.ObjectId }): { access_token: string } {
    const payload = { email: user.email, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
