import { MessageType } from './message';

export type CreateChatMessage = {
  content: string;

  type?: MessageType;
};
