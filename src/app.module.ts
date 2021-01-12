import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configutarion } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    // si estamos en desarrollo será el port 5000 que está definido en nuestra variable de entorno en .env, sino,
    // si estamos en prod, será el port que nuestro poveedor de nube o de hosting nos provea y eso debemos
    // configurarlo en config.service.ts
    AppModule.port = this._configService.get(Configutarion.PORT);
  }
}
