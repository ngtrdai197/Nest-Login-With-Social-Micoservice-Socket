export interface IRequestConnect {
  eventId: string;
}

export interface IMessage {
  eventId: string;
  message?: string;
  imageMessage?: string;
}

export interface ILikeMessage {
  eventId: string;
  messageId: string;
}
