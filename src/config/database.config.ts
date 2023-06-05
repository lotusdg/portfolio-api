import { SequelizeModuleOptions } from '@nestjs/sequelize';

const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  autoLoadModels: true,
  synchronize: true,
};

export default databaseConfig;
