import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
