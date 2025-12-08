import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './order.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order.entity';
import { User } from '../users/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const order = await this.ordersService.create(user.id, createOrderDto);
    return {
      message: 'ההזמנה נוצרה בהצלחה',
      order,
    };
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    const orders = await this.ordersService.findAll(user.id);
    return { orders };
  }

  //Admin
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/admin')
  async findAllAdmin() {
    const orders = await this.ordersService.findAllAdmin();
    return { orders };
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @CurrentUser() user: User) {
    const order = await this.ordersService.findOne(id);
    // וידוא שהמשתמש מורשה לראות את ההזמנה
    if (user.role!="admin" && order.userId !== user.id) {
      throw new Error('אין לך הרשאה לצפות בהזמנה זו');
    }

    return { order };
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: OrderStatus,
    @CurrentUser() user: User,
  ) {
    const order = await this.ordersService.updateStatus(id, status, user.id);
    return {
      message: 'סטטוס ההזמנה עודכן בהצלחה',
      order,
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: number, @CurrentUser() user: User) {
    const order = await this.ordersService.cancelOrder(id, user.id);
    return {
      message: 'ההזמנה בוטלה בהצלחה',
      order,
    };
  }

  
}
