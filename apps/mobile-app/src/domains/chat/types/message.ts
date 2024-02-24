export enum MessageType {
  ACCEPT = 'ACCEPT',
  DECLIDE = 'DECLINE',
}

export type ChatMessage = {
  id: string;
  content: string;
  type?: MessageType;
  authorId: string;
  applicationId: string;
  // Gotta love the fact that createdAt and updatedAt are strings
  createdAt: string;
  updatedAt: string;
};
