import { Module } from '@nestjs/common';
import { Configutarion } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RoleModule, AuthModule, BookModule], // se importan modulos para hacer inyección de dependencias en los constructores
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
