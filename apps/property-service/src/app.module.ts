import { Module } from '@nestjs/common';
import { PropertiesModule } from './properties/properties.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PropertiesModule],
})
export class AppModule {}
