import { Body, Controller, Get, Post, Put, ValidationPipe } from '@nestjs/common';
import { TaskDto } from 'src/dtos/create-task.dto';
import { ResultDto } from 'src/dtos/result.dto';
import { TaskService } from 'src/services/task.service';

@Controller('api')
export class TaskController {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
    private readonly taskService: TaskService
    ) {}

  @Get()
  getHello(): string {
    return this.taskService.getHello();
  }

  @Post('create')
  async create(@Body(ValidationPipe) taskDto: TaskDto): Promise<ResultDto> {
    try {
      console.log("taskDto ==> ",taskDto)
      const user = await this.taskRepository.create(taskDto);
      console.log("user ==>", user)
      return new ResultDto('Sucesso ao salvar a tarefa', true, user, null);
    } catch (error) {
      return new ResultDto(
        'Falha ao tentar criar tarefa',
        false,
        null,
        error,
      );
    }
  }

  @Put('update')
  async edit(@Body(ValidationPipe) taskDto: TaskDto): Promise<ResultDto> {
   try {
      const user = await this.taskService.update(taskDto);
      return new ResultDto('Sucesso ao atualizar dados da tarefa', true, user, null);
   } catch (error) {
    return new ResultDto(
      'Falha ao tentar editar dados da tarefa',
      false,
      null,
      error,
    );
   }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id) {
    try {
      await this.taskService.remove(id);
      return new ResultDto('Tarefa', true, null, null);
    } catch (error) {}
  }

  @Get()
  async list(): Promise<ResultDto> {
    const user = await this.taskRepository.get();
    return new ResultDto('Sucesso ao buscar as tarefas', true, user, null);
  }
}