import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import MessageType from '../interfaces/message-type.enum';

export class CreateChatDto {
  @IsNotEmpty()
  @MaxLength(250)
  content: string;

  @IsOptional()
  @IsEnum(MessageType)
  type?: MessageType;
}
