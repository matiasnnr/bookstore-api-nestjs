import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

// cada vez que importemos este módulo en otra clase, tendremos una nueva instancia de ConfigService
@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService()
        }
    ],
    exports: [ConfigService],
})
export class ConfigModule { }
