import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'

@ApiTags(`users`)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(username, updateUserDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':username')
  async remove(@Param('username') username: string) {
    await this.usersService.remove(username)
  }
}
