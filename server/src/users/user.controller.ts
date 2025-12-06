/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/users/users.controller.ts
import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return {
      user,
    };
  }

  @Patch('me')
  async updateMe(@CurrentUser() user: User, @Body() updateData: Partial<User>) {
    // מסננים רק שדות שמותר לעדכן
    const allowedFields = ['firstName', 'lastName', 'phone', 'address'];
    const filteredData: Partial<User> = {};
    allowedFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    });

    const updatedUser = await this.usersService.update(user.id, filteredData);
    return {
      message: 'הפרופיל עודכן בהצלחה',
      user: updatedUser,
    };
  }
}
