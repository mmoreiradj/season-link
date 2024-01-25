import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ApplicationsModule } from '../applications/applications.module';
import { ApplicationsService } from 'app/applications/applications.service';

@Module({
  imports: [ApplicationsModule],
  controllers: [ChatController],
  providers: [ChatService, ApplicationsService],
})
export class ChatModule {}
