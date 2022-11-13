export interface IMessagesRepository {
  addMessage(userId: number, message: string, chatId: number): Promise<any>;
}
