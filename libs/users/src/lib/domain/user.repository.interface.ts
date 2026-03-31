import { User } from "./user.entity";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<Array<User>>;
}
