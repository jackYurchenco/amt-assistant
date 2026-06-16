import { Controller, Get, Delete, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetSessionsByUserIdUseCase } from '../application/get-sessions-by-user-id/get-sessions-by-user-id.use-case';
import { GetSessionsByUserIdQuery } from '../application/get-sessions-by-user-id/get-sessions-by-user-id.query';
import { RemoveSessionByIdUseCase } from '../application/remove-session-by-id/remove-session-by-id.use-case';
import { RemoveSessionByIdCommand } from '../application/remove-session-by-id/remove-session-by-id.command';
import { RemoveSessionsByUserIdUseCase } from '../application/remove-sessions-by-user-id/remove-sessions-by-user-id.use-case';
import { RemoveSessionsByUserIdCommand } from '../application/remove-sessions-by-user-id/remove-sessions-by-user-id.command';
import { SessionResponseDto } from './dto/session-response.dto';
import { GetSessionsByUserIdDto } from './dto/get-sessions-by-user-id.dto';
import { RemoveSessionByIdDto } from './dto/remove-session-by-id.dto';
import { RemoveSessionsByUserIdDto } from './dto/remove-sessions-by-user-id.dto';
@ApiTags('sessions')
@ApiBearerAuth()
@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly getSessionsByUserIdUseCase: GetSessionsByUserIdUseCase,
    private readonly removeSessionByIdUseCase: RemoveSessionByIdUseCase,
    private readonly removeSessionsByUserIdUseCase: RemoveSessionsByUserIdUseCase,
  ) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get sessions by user id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The sessions have been successfully retrieved.',
    type: [SessionResponseDto],
  })
  async getSessionsByUserId(@Param() dto: GetSessionsByUserIdDto): Promise<SessionResponseDto[]> {
    const query = new GetSessionsByUserIdQuery(dto.userId);
    const sessions = await this.getSessionsByUserIdUseCase.execute(query);
    return sessions.map(session => SessionResponseDto.fromEntity(session));
  }

  @Delete(':id/user/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove session by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The session has been successfully removed.',
  })
  async removeSessionById(@Param() dto: RemoveSessionByIdDto): Promise<void> {
    const command = new RemoveSessionByIdCommand(dto.id, dto.userId);
    await this.removeSessionByIdUseCase.execute(command);
  }

  @Delete('user/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove sessions by user id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The sessions have been successfully removed.',
  })
  async removeSessionsByUserId(@Param() dto: RemoveSessionsByUserIdDto): Promise<void> {
    const command = new RemoveSessionsByUserIdCommand(dto.userId);
    await this.removeSessionsByUserIdUseCase.execute(command);
  }
}
