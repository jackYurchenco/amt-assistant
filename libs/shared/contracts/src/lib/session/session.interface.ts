export interface ISession {
  id: string;
  userId: string;
  refreshToken: string;
  expiresAt: Date;
  userAgent: string | null;
  isExpired: boolean;
}
