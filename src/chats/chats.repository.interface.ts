export interface IChatsRepository {
  getChats(userId: number): Promise<any>;
}
