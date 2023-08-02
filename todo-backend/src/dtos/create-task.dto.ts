import {
  IsNotEmpty
} from 'class-validator';

export class TaskDto {
  
  id: number;

  @IsNotEmpty({
    message: 'Informe um título para a tarefa',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe a descrição da tarefa',
  })
  description: string;
  
  valid_until: Date;
  concluded: boolean;
}
