import { TypeOrmModule } from '@nestjs/typeorm';
import { Configutarion } from '../config/config.keys';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        // importamos ConfigService para traer los datos de conexión
        imports: [ConfigModule],
        inject: [ConfigService],
        // usamos useFactory para crear el objeto de conexión
        async useFactory(config: ConfigService) {
            return {
                // ssl: true,
                type: 'postgres' as 'postgres',
                host: config.get(Configutarion.HOST),
                port: 5444,
                database: config.get(Configutarion.DATABASE),
                username: config.get(Configutarion.USERNAME),
                password: config.get(Configutarion.PASSWORD),
                entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
                migrations: [`${__dirname}/migrations/*{.ts,.js}`]
            } as ConnectionOptions
        }
    })
]