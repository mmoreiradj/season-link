import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'shared/prisma/prisma.service';
import { ApplicationsService } from 'app/applications/applications.service';
import CustomHeaders from 'shared/interfaces/custom-headers.iface';
import ApplicationState from 'app/applications/interfaces/application-state.enum';
import MessageType from './interfaces/message-type.enum';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appliService: ApplicationsService,
  ) {}

  /**
   * Creates a new chat message
   *
   * Needs to check:
   *
   * - if the application exists
   * - if the user has access to the application
   *
   * @param createChatDto
   * @param userId
   * @param type
   * @returns
   */
  async create(
    applicationId: string,
    createChatDto: CreateChatDto,
    customHeaders: CustomHeaders,
    type?: string,
  ) {
    // TODO: check if the recruiter has access to the application
    const application = await this.appliService.getApplication(applicationId, {
      userId: customHeaders.userId,
      userRoles: customHeaders.userRoles,
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    } else if (application.state !== ApplicationState.PENDING) {
      throw new BadRequestException(
        'You can only send messages to pending applications',
      );
    } else if (
      !customHeaders.userRoles.includes('client_recruiter') &&
      application.candidateId !== customHeaders.userId
    ) {
      throw new ForbiddenException('You cannot access this application');
    }

    // update application state
    if (createChatDto.type) {
      await this.appliService.updateApplicationState(
        application.id,
        customHeaders,
        createChatDto.type === MessageType.ACCEPT
          ? ApplicationState.APPROVED
          : ApplicationState.REJECTED,
      );
    }

    return this.prisma.message.create({
      data: {
        ...createChatDto,
        applicationId,
        authorId: customHeaders.userId,
        type: type,
      },
    });
  }

  findAll(applicationId: string) {
    return this.prisma.message.findMany({
      where: {
        applicationId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
