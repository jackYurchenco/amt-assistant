export interface IUser {
  id: string,
  email: string,
  passwordHash: string,
  createdAt: Date,
  updatedAt: Date,
  firstName?: string | null,
  lastName?: string | null,
}
