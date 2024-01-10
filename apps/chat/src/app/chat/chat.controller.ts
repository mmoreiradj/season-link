import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ForbiddenException,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import UserData from 'shared/decorator/header.decorator';
import CustomHeaders from 'shared/interfaces/custom-headers.iface';
import { ApplicationsService } from 'app/applications/applications.service';

@Controller('applications/:applicationId/messages')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly applicationService: ApplicationsService,
  ) {}

  @Post()
  create(
    @Param('applicationId', ParseUUIDPipe) applicationId: string,
    @Body() createChatDto: CreateChatDto,
    @UserData() user: CustomHeaders,
  ) {
    if (
      createChatDto.type &&
      !user.userRoles.some((role) => role === 'client_recruiter')
    ) {
      throw new ForbiddenException(
        'Only recruiters can send messages with type',
      );
    }
    return this.chatService.create(applicationId, createChatDto, user);
  }

  @Get()
  async findAll(
    @Param('applicationId', ParseUUIDPipe) applicationId: string,
    @UserData() user: CustomHeaders,
  ) {
    const application = await this.applicationService.getApplication(
      applicationId,
      user,
    );

    if (!application) {
      throw new NotFoundException('Application not found');
    } else if (
      user.userRoles.includes('client_candidate') &&
      user.userId !== application.candidateId
    ) {
      throw new ForbiddenException('You cannot access this application');
    }

    return this.chatService.findAll(applicationId);
  }
}
