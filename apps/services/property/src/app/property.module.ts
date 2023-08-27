import { Module } from '@nestjs/common';
import { PropertiesController } from './properties/properties.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PropertiesController],
  providers: [],
})
export class PropertyModule {}
