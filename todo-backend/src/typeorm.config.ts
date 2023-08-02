import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const PRODUCTION = true;
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: 'root',
  database: 'sql_server_test',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: true,
  keepConnectionAlive: true
};

export const SERVER_CONFIGS = {
  url_default: 'http://localhost:3040'
}
