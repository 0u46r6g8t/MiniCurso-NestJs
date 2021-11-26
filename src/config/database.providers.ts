import { createConnection } from 'typeorm';

export const databaseProvider = 'DATABASE_CONNECTION';

export const databaseProviders = [
  {
    provide: databaseProvider,
    useFactory: async () => {
      return createConnection({
        type: `postgres`,
        host: `${process.env.TYPEORM_HOST}`,
        port: parseInt(process.env.TYPEORM_PORT),
        username: `${process.env.TYPEORM_USERNAME}`,
        database: `${process.env.TYPEORM_DATABASE}`,
        password: `${process.env.TYPEORM_PASSWORD}`,
        entities: [__dirname + '/../**/typeorm/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrationsTableName: '_migrations',
        synchronize: true,
      });
    },
  },
];
