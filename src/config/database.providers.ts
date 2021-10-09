import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return createConnection({
        type: `postgres`,
        host: `${process.env.TYPEORM_HOST}`,
        port: parseInt(process.env.TYPEORM_PORT),
        username: `${process.env.TYPEORM_USERNAME}`,
        database: `${process.env.TYPEORM_DATABASE}`,
        password: `${process.env.TYPEORM_PASSWORD}`,
        entities: [__dirname + '/../**/entities/*.entity.ts'],
        migrationsRun: true,
        migrationsTableName: '_migrations',
        migrations: [__dirname + '/../migrations/*.ts'],
        synchronize: true,
      });
    },
  },
];
