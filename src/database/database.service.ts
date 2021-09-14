//importar el modulo de type orm desde NestJS
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'src/config/config.keys';
import { ConnectionOptions } from 'typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

//array de tipos de conexiones
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    //importar varibles de entorno
    imports: [ConfigModule],

    //Se hace inyeccion del ConfigService para que la base de datos tenga su credencial
    inject: [ConfigService],

    //Metodo useFactory va a crear el objeto de conexion con las propiedades necesarias
    async useFactory(config: ConfigService) {
      return {
        ssl: true,
        type: 'postgres' as const,
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
