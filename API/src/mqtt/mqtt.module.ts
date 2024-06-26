import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';

@Module({
  exports: [MqttService],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}
