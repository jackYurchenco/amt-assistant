import { Injectable } from '@nestjs/common';
import { SessionReader } from '../../domain/ports/session-reader.port';
import { FindSessionByTokenCommand } from './find-session-by-token.command';
import { SessionResponseDto } from '../../interface/dto/session-response.dto';

@Injectable()
export class FindSessionByTokenUseCase {
  constructor(private readonly sessionReader: SessionReader) {}

  async execute(command: FindSessionByTokenCommand): Promise<SessionResponseDto | null> {
    const session = await this.sessionReader.findByToken(command.token);

    if (!session) {
      return null;
    }

    return SessionResponseDto.fromEntity(session);
  }
}
